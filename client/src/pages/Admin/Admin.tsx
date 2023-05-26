import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Project } from '@/entity/Project'

import {
	Avatar, Box,
	Button,
	CircularProgress,
	Collapse,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText
} from '@mui/material' 
import { Container } from '@/containers/hoc/Container/Container'
import ProjectItem from './ProjectItem/ProjectItem'
import classes from './Admin.module.scss'
import CheckProperty from './ViewAddEditProject/CheckProperty'
import { useAppDispatch } from '@/redux/configure-store'
import { currentHost } from '@/services/server-data'
import { getProjectsFromDb, ProjectsSliceState } from '@/features/projects/projectsSlice'
import { getProjects, getProjectsLoading } from '@/redux/selectors'
import { toggleIsFinished, toggleIsShowOnMain } from '@/features/projects/projectsSlice'

interface CurrentPageState {
	openProjectId: number | null;
	editProjectId: number | null;
	addProjectOpen: boolean;
}

const Admin: React.FC = () => {
	const [currentPageState, setCurrentPageState] = useState<CurrentPageState>({
		openProjectId: null,
		editProjectId: null,
		addProjectOpen: false
	})

	const dispatch = useAppDispatch()
	const projects = useSelector<ProjectsSliceState, Project[]>((state) => getProjects(state))
	const projectsLoading = useSelector((state: ProjectsSliceState) =>
		getProjectsLoading(state)
	)

	useEffect(() => {
		dispatch(getProjectsFromDb())
	}, [])

	const handleOpenProjectClick = (projectId: number) => {
		setCurrentPageState((prevState) => ({
			...prevState,
			openProjectId:
				prevState.openProjectId === projectId ? null : projectId
		}))
	}

	const handleChangeVisible = (project: Project) => {
		dispatch(
			toggleIsShowOnMain({ id: project.id, show: !project.showOnMain })
		)
	}

	const handleChangeFinished = (project: Project) => {
		dispatch(
			toggleIsFinished({ id: project.id, finished: !project.isFinished })
		)
	}

	const renderProject = (project: Project): React.ReactElement => {
		const open = currentPageState.openProjectId === project.id

		return (
			<ListItem alignItems='flex-start' key={project.id}>
				<div className={classes['item-project-wrapper']}>
					<div className={classes['item-project-header']}>
						<ListItemAvatar>
							<Avatar alt={project.title} src={`${currentHost}${project.mainImage}`} />
						</ListItemAvatar>
						<ListItemText
							primary={`${project.id} - ${project.title}`}
							secondary={project.description}
						/>
						<CheckProperty
							title={'Показывать на странице'}
							checked={project.showOnMain ?? false}
							handleProperty={() => handleChangeVisible(project)}
						/>
						<CheckProperty
							title={'Реализован'}
							checked={project.isFinished ?? false}
							handleProperty={() => handleChangeFinished(project)}
						/>
						<Button
							onClick={() => handleOpenProjectClick(project.id)}
						>
							{open ? 'Скрыть' : 'Подробнее'}
						</Button>
					</div>
					<Collapse key={project.id} in={open} timeout='auto' unmountOnExit>
						<List component='li' disablePadding key={project.id}>
							<ProjectItem project={project} />
						</List>
					</Collapse>
				</div>
			</ListItem>
		)
	}

	const addNewProjectPanel = () => {
		return (
			<>
				<Button
					variant='contained'
					color='primary'
					onClick={() =>
						setCurrentPageState((prevState) => ({
							...prevState,
							addProjectOpen: !prevState.addProjectOpen
						}))
					}
					className={classes['button-add-project']}
				>
					Добавить новый проект
				</Button>
				<Collapse
					in={currentPageState.addProjectOpen}
					timeout='auto'
					unmountOnExit
				>
					<ProjectItem />
				</Collapse>
			</>
		)
	}

	return (
		<Box sx={{paddingTop:'16px'}}>
			<Container>
				{projectsLoading ? (
					<CircularProgress />
				) : (
					<>
						{addNewProjectPanel()}
						<div>
							<h6 className={classes['title-project-created']}>
								Существующие проекты:
							</h6>
							<ul className={classes['list-wrapper']}>
								{projects.map((project) => renderProject(project))}
							</ul>
						</div>
					</>
				)}
			</Container>
		</Box>
	)
}

export default Admin
