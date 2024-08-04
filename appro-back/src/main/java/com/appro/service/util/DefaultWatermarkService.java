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

    @Value("${watermark.path}")
    private String watermarkPath;
    @Value("${watermark.transparency.factor}")
    private float transparencyFactor;
    @Value("${watermark.padding}")
    private int watermarkPadding;
    @Value("${watermark.image.result.format}")
    private String imageFormat;


    @Override
    public MultipartFile addWatermark(MultipartFile sourceImage) {
        validateSourceFile(sourceImage);
        log.info("The process of adding watermark to file: {} started.", sourceImage.getOriginalFilename());
        try (InputStream originalStream = sourceImage.getInputStream();
             InputStream watermarkStream = DefaultWatermarkService.class.getResourceAsStream(watermarkPath);
             ByteArrayOutputStream baos = new ByteArrayOutputStream()) {

            BufferedImage originalImage = ImageIO.read(originalStream);

            BufferedImage watermark = ImageIO.read(Objects.requireNonNull(watermarkStream));

            BufferedImage watermarkedImage = addWatermark(originalImage, watermark);

            ImageIO.write(watermarkedImage, imageFormat, baos);

            return createCustomMultipartFile(sourceImage, baos.toByteArray());

        } catch (IOException e) {
            throw new WatermarkException(e);
        }
    }

    private void validateSourceFile(MultipartFile sourceImage) {
        if (sourceImage == null) throw new WatermarkException();
    }

    private BufferedImage addWatermark(BufferedImage originalImage, BufferedImage watermark) {
        BufferedImage watermarked = new BufferedImage(originalImage.getWidth(), originalImage.getHeight(), BufferedImage.TYPE_INT_ARGB);

        Graphics2D g2d = (Graphics2D) watermarked.getGraphics();

        int imageStartPosition = 0;
        g2d.drawImage(originalImage, imageStartPosition, imageStartPosition, null);

        g2d.setComposite(applyTransparency());
        int width = getWidth(originalImage, watermark);
        int height = getHeight(originalImage, watermark);

        g2d.drawImage(watermark, width, height, null);
        g2d.dispose();

        return watermarked;
    }

    private AlphaComposite applyTransparency() {
        return AlphaComposite.getInstance(AlphaComposite.SRC_OVER, transparencyFactor);
    }

    private int getHeight(BufferedImage originalImage, BufferedImage watermarkImage) {
        return originalImage.getHeight() - watermarkImage.getHeight() - watermarkPadding;
    }

    private int getWidth(BufferedImage originalImage, BufferedImage watermarkImage) {
        return originalImage.getWidth() - watermarkImage.getWidth() - watermarkPadding;
    }

    private CustomMultipartFile createCustomMultipartFile(MultipartFile sourceImage, byte... content) {
        return new CustomMultipartFile(
                sourceImage.getName(),
                sourceImage.getOriginalFilename(),
                sourceImage.getContentType(),
                content);
    }

}
