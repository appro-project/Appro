import React, { useEffect } from 'react'
import { Layout } from './containers/hoc/Layout/Layout'
import { Main } from './pages/Main/Main'
import { Catalogue } from './pages/Catalogue/Catalogue'
import { IndividualProject } from './pages/IndividualProject/IndividualProject'

import { Route, Routes } from 'react-router-dom'
import { ProjectPage } from './pages/Project/Project'
import Admin from './pages/Admin/Admin'
import { AdditionalOptions } from './pages/AdditionalOptions/AdditionalOptions'
import { AboutUs } from './pages/AboutUs/AboutUs'
import { getProjectsFromDb, setViewAllProjects } from './redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { getProjectInLocalStorage } from './services/util/localStorage'
import { getProjects } from './redux/selectors'

export const App = () => {
	const dispatch = useDispatch()
	const projects = useSelector(getProjects)

	useEffect(() => {
		dispatch(getProjectsFromDb())
	}, [])

	useEffect(() => {
		const projectInLocalStorage: number[] = getProjectInLocalStorage()
		if (projectInLocalStorage) {
			const filterProjects = projects.filter((elem) => projectInLocalStorage.includes(elem.id))
			dispatch(setViewAllProjects(filterProjects))
		}
	}, [projects])

	return (
		<Routes>
			<Route path={'/admin'} element={<Admin />} />

			<Route element={<Layout />}>
				<Route path={'/'} element={<Main />} />


				<Route path={'/individual-project'} element={<IndividualProject />} />

				<Route path={'/catalogue'} element={<Catalogue />} />

				<Route path={'/catalogue/:projectId'} element={<ProjectPage />} />

				<Route path={'/additional'} element={<AdditionalOptions />} />

				<Route path={'/about'} element={<AboutUs />} />
			</Route>
		</Routes>)

}


