package com.appro.service.impl;

import com.appro.dto.ProjectDto;
import com.appro.entity.Project;
import com.appro.exception.ProjectNotFoundException;
import com.appro.mapper.ProjectMapper;
import com.appro.repository.ProjectRepository;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
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
    private ProjectMapper projectMapper;

    @InjectMocks
    private DefaultProjectService projectService;

    private List<Project> projects;
    private List<ProjectDto> projectDtos;
    private Project project;
    private ProjectDto projectDto;

    @BeforeEach
    void setUp() {
        projects = createProjects();
        projectDtos = createProjectDtos();
        project = createProject();
        projectDto = createProjectDto();
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

    @Test
    @DisplayName("Test - delete project.")
    void givenProject_whenDelete_thenStatusIsDeleted() {
        // given
        int projectId = project.getId();

        when(projectRepository.findById(projectId)).thenReturn(Optional.of(project));

        // when
        projectService.delete(projectId);

        // then
        verify(projectRepository).findById(projectId);
        verify(projectRepository).save(project);
        assertEquals(true, project.getIsDeleted());
    }

    @Test
    @DisplayName("Test - delete project with not existing id.")
    void givenNotExistingProjectId_whenDelete_thenThrowProjectNotFoundException() {
        // given
        int projectId = 100;

        // when
        when(projectRepository.findById(projectId)).thenReturn(Optional.empty());

        // then
        assertThrows(ProjectNotFoundException.class, () -> projectService.delete(projectId));
        verify(projectRepository, never()).save(any(Project.class));
    }

    @Test
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
    @DisplayName("Test - find not existing project, throw exception.")
    void givenNotExistingProjectId_whenFindProjectById_thenThrowProjectNotFoundException() {
        // given
        int projectId = 100;

        when(projectRepository.findById(projectId)).thenReturn(Optional.empty());

        // when / then
        assertThrows(ProjectNotFoundException.class, () -> projectService.findProjectById(projectId));
        verify(projectRepository).findById(projectId);
    }

    @Test
    @DisplayName("Test - find project dto.")
    void givenProject_whenFindByIdFullInfo_thenReturnProjectDto() {
        // given
        int projectId = project.getId();

        when(projectRepository.findById(projectId)).thenReturn(Optional.of(project));
        when(projectMapper.toProjectDto(project)).thenReturn(projectDto);

        // when
        ProjectDto actualProjectDto = projectService.findProjectFullInfo(projectId);

        // then
        assertEquals(projectDto, actualProjectDto);
        verify(projectRepository).findById(projectId);
        verify(projectMapper).toProjectDto(project);
    }

    @Test
    @DisplayName("Test - find not existing project, throw exception.")
    void givenNotExistingProject_whenFindByIdFullInfo_thenThrowProjectNotFoundException() {
        // given
        int projectId = 100;

        when(projectRepository.findById(projectId)).thenThrow(new ProjectNotFoundException(projectId));

        // when / then
        assertThrows(ProjectNotFoundException.class, () -> projectService.findProjectFullInfo(projectId));
        verify(projectMapper, never()).toProjectDto(any(Project.class));
    }

    @Test
    @DisplayName("Test - is sortable field.")
    void givenSortableField_whenIsSortableField_thenReturnTrue() {
        assertTrue(projectService.isSortableField("id"));
        assertTrue(projectService.isSortableField("popularity"));
        assertTrue(projectService.isSortableField("generalArea"));
        assertTrue(projectService.isSortableField("projectPrice"));
    }

    @Test
    @DisplayName("Test - is non sortable field.")
    void givenNonSortableField_whenIsSortableField_thenReturnFalse() {
        assertFalse(projectService.isSortableField("non sortable field"));
        assertFalse(projectService.isSortableField(null));
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

    private ProjectDto createProjectDto() {
        return ProjectDto.builder()
                .id(1)
                .build();
    }

}