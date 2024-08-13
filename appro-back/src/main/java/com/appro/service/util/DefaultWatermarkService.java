package com.appro.service.util;

import com.appro.exception.WatermarkException;
import com.appro.service.WatermarkService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.Graphics2D;
import java.awt.AlphaComposite;
import java.awt.image.BufferedImage;
import java.io.InputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
public class DefaultWatermarkService implements WatermarkService {

    private static final int STARTING_POINT = 0;
    private static final int HALF_FACTOR = 2;

    @Value("${watermark.path}")
    private String watermarkPath;
    @Value("${watermark.transparency.factor}")
    private float transparencyFactor;
    @Value("${watermark.image.result.format}")
    private String imageFormat;
    @Value("${watermark.scale}")
    private float watermarkScale;


    @Override
    public MultipartFile addWatermark(MultipartFile sourceImage) {
        validateSourceFile(sourceImage);
        log.info("The process of adding watermark to file: {} started.", sourceImage.getOriginalFilename());
        try (InputStream originalStream = sourceImage.getInputStream();
             InputStream watermarkStream = DefaultWatermarkService.class.getResourceAsStream(watermarkPath);
             ByteArrayOutputStream baos = new ByteArrayOutputStream()) {

            BufferedImage originalImage = ImageIO.read(originalStream);
            BufferedImage watermark = ImageIO.read(Objects.requireNonNull(watermarkStream));
            BufferedImage scaledWatermark = scaleWatermark(originalImage.getWidth(), watermark);
            BufferedImage watermarkedImage = addWatermark(originalImage, scaledWatermark);

            ImageIO.write(watermarkedImage, imageFormat, baos);

            log.info("The watermark added.");
            return createCustomMultipartFile(sourceImage, baos.toByteArray());
        } catch (IOException e) {
            throw new WatermarkException(e);
        }
    }

    private void validateSourceFile(MultipartFile sourceImage) {
        if (sourceImage == null)
            throw new WatermarkException();
    }

    private BufferedImage addWatermark(BufferedImage originalImage, BufferedImage watermark) {
        BufferedImage watermarked = new BufferedImage(originalImage.getWidth(), originalImage.getHeight(), BufferedImage.TYPE_INT_ARGB);
        Graphics2D g2d = watermarked.createGraphics();

        g2d.drawImage(originalImage, STARTING_POINT, STARTING_POINT, null);
        g2d.setComposite(applyTransparency());

        int width = getWidth(originalImage, watermark);
        int height = getHeight(originalImage, watermark);

        g2d.drawImage(watermark, width, height, null);
        g2d.dispose();

        return watermarked;
    }

    private BufferedImage scaleWatermark(int originalImageWidth, BufferedImage watermark) {
        log.info("Scaling the watermark.");
        int targetWidth = (int) (originalImageWidth * watermarkScale);
        int targetHeight = targetWidth * watermark.getHeight() / watermark.getWidth();

        BufferedImage scaledWatermark = new BufferedImage(targetWidth, targetHeight, BufferedImage.TYPE_INT_ARGB);
        Graphics2D g2d = scaledWatermark.createGraphics();
        g2d.drawImage(watermark, STARTING_POINT, STARTING_POINT, targetWidth, targetHeight, null);
        g2d.dispose();

        return scaledWatermark;
    }

    private AlphaComposite applyTransparency() {
        return AlphaComposite.getInstance(AlphaComposite.SRC_OVER, transparencyFactor);
    }

    private int getHeight(BufferedImage originalImage, BufferedImage watermarkImage) {
        return (originalImage.getHeight() - watermarkImage.getHeight()) / HALF_FACTOR;
    }

    private int getWidth(BufferedImage originalImage, BufferedImage watermarkImage) {
        return (originalImage.getWidth() - watermarkImage.getWidth()) / HALF_FACTOR;
    }

    private CustomMultipartFile createCustomMultipartFile(MultipartFile sourceImage, byte... content) {
        return new CustomMultipartFile(
                sourceImage.getName(),
                sourceImage.getOriginalFilename(),
                sourceImage.getContentType(),
                content);
    }

}
