import React, {useEffect} from 'react'
import {Layout} from './containers/hoc/Layout/Layout'
import {Main} from './pages/Main/Main'
import {Catalogue} from './pages/Catalogue/Catalogue'
import {IndividualProject} from './pages/IndividualProject/IndividualProject'

import {Route, Routes} from 'react-router-dom'
import {ProjectPage} from './pages/Project/Project'
import {AdditionalOptions} from './pages/AdditionalOptions/AdditionalOptions'
import {AboutUs} from './pages/AboutUs/AboutUs'
import {setViewAllProjects} from './redux/actions'
import {getProjectInLocalStorage} from './services/util/localStorage'
import {useAppDispatch} from '@/redux/configure-store'
import {ProjectsList} from "@/pages/new-admin/projects-list/projects-list.page";
import {ProjectInfo} from "@/pages/new-admin/project-info/project-info.component";
import {AdminLayout} from "@/pages/new-admin/admin-layout.component";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useGetAllProjects} from "@/api/useGetAllProjects";


// Create a client
const queryClient = new QueryClient()

export const App = () => {
    const dispatch = useAppDispatch()
    const {data: projects} = useGetAllProjects()

    useEffect(() => {
        if (!projects) return;
        const projectInLocalStorage: number[] = getProjectInLocalStorage()
        if (projectInLocalStorage) {
            const filterProjects = projects.filter((elem) => projectInLocalStorage.includes(elem.id))
            dispatch(setViewAllProjects(filterProjects))
        }
    }, [projects])

    return (
        <QueryClientProvider client={queryClient}>
            <Routes>
                <Route element={<AdminLayout/>}>
                    <Route path={'/new-admin/project/new'} element={<ProjectInfo/>}/>
                    <Route path={'/new-admin/project/:projectId'} element={<ProjectInfo/>}/>
                    <Route path={'/new-admin'} element={<ProjectsList/>}/>
                </Route>

                <Route element={<Layout/>}>
                    <Route path={'/'} element={<Main/>}/>


                    <Route path={'/individual-project'} element={<IndividualProject/>}/>

                    <Route path={'/catalogue'} element={<Catalogue/>}/>

                    <Route path={'/catalogue/:projectId'} element={<ProjectPage/>}/>

                    <Route path={'/additional'} element={<AdditionalOptions/>}/>

                    <Route path={'/about'} element={<AboutUs/>}/>
                </Route>
            </Routes>
        </QueryClientProvider>)

}


