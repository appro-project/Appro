package com.appro.service.util;

import com.appro.exception.WatermarkException;
import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.spy;
import static org.mockito.Mockito.doThrow;

import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

@ExtendWith(MockitoExtension.class)
public class DefaultWatermarkServiceTest {

	private static final String ORIGINAL_FILE_NAME = "sourceImage";
	private static final String WATERMARK_PATH = "/static/watermark/watermark.png";
	private static final String IMAGE_FORMAT = "png";
	private static final float SCALE = 0.25f;

	@InjectMocks
	private DefaultWatermarkService watermarkService;

	@BeforeEach
	void setup() {
		ReflectionTestUtils.setField(watermarkService, "watermarkPath", WATERMARK_PATH);
		ReflectionTestUtils.setField(watermarkService, "imageFormat", IMAGE_FORMAT);
		ReflectionTestUtils.setField(watermarkService, "watermarkScale", SCALE);
	}

	@Test
	@DisplayName("Test - apply watermark to image.")
	void givenSourceImage_whenApplyWatermark_shouldAddItToSourceImage() throws Exception {
		// Given: source image prepared with a custom MultipartFile
		int size = 100;
		BufferedImage image = new BufferedImage(size, size, BufferedImage.TYPE_INT_ARGB);
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		ImageIO.write(image, IMAGE_FORMAT, outputStream);

		MultipartFile sourceImage = new CustomMultipartFile(
				"sourceImage",
				ORIGINAL_FILE_NAME,
				IMAGE_FORMAT,
				outputStream.toByteArray()
		);

		// When: Execute the method to add watermark to the source image
		MultipartFile watermarkedFile = watermarkService.addWatermark(sourceImage);

		// Then: Assert that watermark is applied correctly
		assertNotNull(watermarkedFile, "The returned MultipartFile should not be null.");
		assertFalse(watermarkedFile.isEmpty(), "The returned file should contain data.");
		assertNotNull(watermarkedFile.getBytes(), "The watermarked file should have bytes content.");
		assertEquals(ORIGINAL_FILE_NAME, watermarkedFile.getOriginalFilename(), "Original filenames should match.");
	}

	@Test
	@DisplayName("Test - apply watermark to null image should throw exception.")
	void givenSourceImageAsNull_whenAddWatermark_shouldThrowWatermarkException() {
		// Given: source image.
		MultipartFile sourceImage = null;

		// When: Execute the method to add watermark to the source image.
		// Then: throw WatermarkException.
		assertThrows(WatermarkException.class, () -> watermarkService.addWatermark(sourceImage));
	}

	@Test
	@DisplayName("Test - handle IOException by throwing WatermarkException.")
	void givenSourceImage_whenAddWatermark_shouldThrowWatermarkException() throws Exception {
		// Given: source image
		MultipartFile sourceImage = spy(new CustomMultipartFile(
				"sourceImage",
				ORIGINAL_FILE_NAME,
				IMAGE_FORMAT,
				new byte[] {}));

		// When: source image get input stream.
		doThrow(new IOException()).when(sourceImage).getInputStream();
		// Then: throw WatermarkException.
		assertThrows(WatermarkException.class, () -> watermarkService.addWatermark(sourceImage));
	}

}
