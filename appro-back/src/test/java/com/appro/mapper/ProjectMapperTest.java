package com.appro.mapper;

import com.appro.dto.ImageInfo;
import com.appro.dto.ProjectDto;
import com.appro.entity.Image;
import com.appro.entity.Project;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ProjectMapperTest {

    @Autowired
    private ProjectMapper projectMapper;

    @Test
    void toProjectDto() {
//
//        // Створення тестових об'єктів
//        Project project = new Project(); // Припускаємо, що у вас є відповідні сеттери
//        Image mainImage = new Image();
//        List<ImageInfo> imagesInfoList = new ArrayList<>();
//
//        // Заповніть об'єкти тестовими даними
//
//        // Виконання маппінгу
//        ProjectDto projectDto = projectMapper.toProjectDto(project, mainImage, imagesInfoList);
//
//        // Перевірки
//        assertNotNull(projectDto);
//        assertEquals(project.getId(), projectDto.getId());
//        // Додайте більше перевірок для інших полів

    }
}