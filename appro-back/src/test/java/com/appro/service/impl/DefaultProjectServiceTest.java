package com.appro.service.impl;

import com.appro.dto.ProjectDto;
import com.appro.entity.Project;
import com.appro.mapper.FloorMapper;
import com.appro.mapper.ImageMapper;
import com.appro.mapper.ProjectMapper;
import com.appro.repository.ProjectRepository;
import com.appro.service.FloorService;
import com.appro.service.ImageService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class DefaultProjectServiceTest {
    @Mock
    private ProjectRepository projectRepository;

    @Mock
    private ImageService imageService;

    @Mock
    private FloorService floorService;

    @Mock
    private ProjectMapper projectMapper;

    @Mock
    private FloorMapper floorMapper;

    @Mock
    private ImageMapper imageMapper;

    @Mock
    private BeanFactory beanFactory;

    @InjectMocks
    private DefaultProjectService projectService;

    private List<Project> projects;
    private List<ProjectDto> projectDtos;

    @BeforeEach
    void setUp() {
        projects = createProjects();
        projectDtos = createProjectDtos();
    }

    @Test
    @DisplayName("Test - find all, sort by: id, direction: asc.")
    void givenSortAndDirection_whenFindAll_thenReturnProjectsSortedByIdAsc() {
        testFindAllWithSorting("id", "ASC");
    }

    @Test
    @DisplayName("Test - find all, sort by: id, direction: desc.")
    void givenSortAndDirection_whenFindAll_thenReturnProjectsSortedByIdDesc() {
        testFindAllWithSorting("id", "DESC");
    }

    @Test
    @DisplayName("Test - find all, sort by: popularity, direction: asc.")
    void givenSortAndDirection_whenFindAll_thenReturnProjectsSortedByPopularityAsc() {
        testFindAllWithSorting("popularity", "ASC");
    }

    @Test
    @DisplayName("Test - find all, sort by: popularity, direction: desc.")
    void givenSortAndDirection_whenFindAll_thenReturnProjectsSortedByPopularityDesc() {
        testFindAllWithSorting("popularity", "DESC");
    }

    @Test
    @DisplayName("Test - find all, sort by: general area, direction: asc.")
    void givenSortAndDirection_whenFindAll_thenReturnProjectsSortedByGeneralAreaAsc() {
        testFindAllWithSorting("generalArea", "ASC");
    }

    @Test
    @DisplayName("Test - find all, sort by: general area, direction: desc.")
    void givenSortAndDirection_whenFindAll_thenReturnProjectsSortedByGeneralAreaDesc() {
        testFindAllWithSorting("generalArea", "DESC");
    }

    @Test
    @DisplayName("Test - find all, sort by: project price, direction: asc.")
    void givenSortAndDirection_whenFindAll_thenReturnProjectsSortedByProjectPriceAsc() {
        testFindAllWithSorting("projectPrice", "ASC");
    }

    @Test
    @DisplayName("Test - find all, sort by: project price, direction: desc.")
    void givenSortAndDirection_whenFindAll_thenReturnProjectsSortedByProjectPriceDesc() {
        testFindAllWithSorting("projectPrice", "DESC");
    }

    @Test
    @DisplayName("Test - find all, sort by: created at, direction: asc.")
    void givenSortAndDirection_whenFindAll_thenReturnProjectsSortedByDefault() {
        // given
        String sortBy = "nonSortableField";
        String sortDirection = "ASC";
        Sort sort = Sort.by(Sort.Direction.ASC, "createdAt");

        when(projectRepository.findAll(sort)).thenReturn(projects);
        when(projectMapper.toProjectsDto(projects)).thenReturn(projectDtos);

        // when
        List<ProjectDto> actualProjects = projectService.findAll(sortBy, sortDirection);

        // then
        assertEquals(projectDtos, actualProjects);
        verify(projectRepository).findAll(sort);
        verify(projectMapper).toProjectsDto(projects);
    }

    private void testFindAllWithSorting(String sortBy, String sortDirection) {
        // given
        Sort.Direction direction = Sort.Direction.fromString(sortDirection);
        Sort sort = Sort.by(direction, sortBy);

        when(projectRepository.findAll(sort)).thenReturn(projects);
        when(projectMapper.toProjectsDto(projects)).thenReturn(projectDtos);

        // when
        List<ProjectDto> actualProjects = projectService.findAll(sortBy, sortDirection);

        // then
        assertEquals(projectDtos, actualProjects);
        verify(projectRepository).findAll(sort);
        verify(projectMapper).toProjectsDto(projects);
    }

    private List<Project> createProjects() {
        return List.of(
                new Project(),
                new Project(),
                new Project());

    }

    private List<ProjectDto> createProjectDtos() {
        return List.of(
                new ProjectDto(),
                new ProjectDto(),
                new ProjectDto());
    }


}