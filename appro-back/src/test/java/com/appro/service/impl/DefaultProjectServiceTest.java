package com.appro.service.impl;

import com.appro.dto.ProjectDto;
import com.appro.entity.Project;
import com.appro.exception.ProjectNotFoundException;
import com.appro.mapper.FloorMapper;
import com.appro.mapper.ImageMapper;
import com.appro.mapper.ProjectMapper;
import com.appro.repository.ProjectRepository;
import com.appro.service.FloorService;
import com.appro.service.ImageService;
import com.appro.service.ProjectService;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
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
    private Project project;

    @BeforeEach
    void setUp() {
        projects = createProjects();
        projectDtos = createProjectDtos();
        project = createProject();
    }

    @Test
    @Order(1)
    @DisplayName("Test - find all, sort by: id, direction: asc.")
    void givenSortAndDirection_whenFindAll_thenReturnProjectsSortedByIdAsc() {
        testFindAllWithSorting("id", "ASC");
    }

    @Test
    @Order(2)
    @DisplayName("Test - find all, sort by: id, direction: desc.")
    void givenSortAndDirection_whenFindAll_thenReturnProjectsSortedByIdDesc() {
        testFindAllWithSorting("id", "DESC");
    }

    @Test
    @Order(3)
    @DisplayName("Test - find all, sort by: popularity, direction: asc.")
    void givenSortAndDirection_whenFindAll_thenReturnProjectsSortedByPopularityAsc() {
        testFindAllWithSorting("popularity", "ASC");
    }

    @Test
    @Order(4)
    @DisplayName("Test - find all, sort by: popularity, direction: desc.")
    void givenSortAndDirection_whenFindAll_thenReturnProjectsSortedByPopularityDesc() {
        testFindAllWithSorting("popularity", "DESC");
    }

    @Test
    @Order(5)
    @DisplayName("Test - find all, sort by: general area, direction: asc.")
    void givenSortAndDirection_whenFindAll_thenReturnProjectsSortedByGeneralAreaAsc() {
        testFindAllWithSorting("generalArea", "ASC");
    }

    @Test
    @Order(6)
    @DisplayName("Test - find all, sort by: general area, direction: desc.")
    void givenSortAndDirection_whenFindAll_thenReturnProjectsSortedByGeneralAreaDesc() {
        testFindAllWithSorting("generalArea", "DESC");
    }

    @Test
    @Order(7)
    @DisplayName("Test - find all, sort by: project price, direction: asc.")
    void givenSortAndDirection_whenFindAll_thenReturnProjectsSortedByProjectPriceAsc() {
        testFindAllWithSorting("projectPrice", "ASC");
    }

    @Test
    @Order(8)
    @DisplayName("Test - find all, sort by: project price, direction: desc.")
    void givenSortAndDirection_whenFindAll_thenReturnProjectsSortedByProjectPriceDesc() {
        testFindAllWithSorting("projectPrice", "DESC");
    }

    @Test
    @Order(9)
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

    @Test
    @Order(10)
    @DisplayName("Test - delete project.")
    void givenProject_whenDelete_thenStatusIsDeleted() {
        // given
        int projectId = project.getId();
        ProjectService proxyServer = mock(ProjectService.class);

        when(beanFactory.getBean(ProjectService.class)).thenReturn(proxyServer);
        when(proxyServer.findProjectById(projectId)).thenReturn(project);

        // when
        projectService.delete(projectId);

        // then
        verify(proxyServer).findProjectById(projectId);
        verify(projectRepository).save(project);
        assertEquals(true, project.getIsDeleted());
    }

    @Test
    @Order(11)
    @DisplayName("Test - delete project with not existing id.")
    void givenNotExistingProjectId_whenDelete_thenThrowProjectNotFoundException() {
        // given
        int projectId = 100;
        ProjectService proxyServer = mock(ProjectService.class);

        // when
        when(beanFactory.getBean(ProjectService.class)).thenReturn(proxyServer);
        when(proxyServer.findProjectById(projectId)).thenThrow(new ProjectNotFoundException(projectId));

        // then
        assertThrows(ProjectNotFoundException.class, () -> projectService.delete(projectId));
        verify(proxyServer).findProjectById(projectId);
        verify(projectRepository, never()).save(any(Project.class));
    }

    @Test
    @Order(12)
    @DisplayName("Test - find project by id.")
    void givenProject_whenFindProjectById_thenReturnActualProject() {
        // given
        int projectId = project.getId();
        when(projectRepository.findById(projectId)).thenReturn(Optional.of(project));

        // when
        Project actualProject = projectService.findProjectById(projectId);

        // then
        assertEquals(project, actualProject);
        verify(projectRepository).findById(projectId);
    }

    @Test
    @Order(13)
    @DisplayName("Test - find not existing project, throw exception.")
    void givenNotExistingProjectId_whenFindProjectById_thenThrowProjectNotFoundException() {
        // given
        int projectId = 100;

        when(projectRepository.findById(projectId)).thenReturn(Optional.empty());

        // when / then
        assertThrows(ProjectNotFoundException.class, () -> projectService.findProjectById(projectId));
        verify(projectRepository).findById(projectId);
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

    private Project createProject() {
        return Project.builder()
                .id(1)
                .isDeleted(false)
                .build();
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