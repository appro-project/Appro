import {useEffect} from 'react'
import {Layout} from './containers/hoc/Layout/Layout'
import {Main} from './pages/Main/Main'
import {Catalogue} from './pages/Catalogue/Catalogue'
import {IndividualProject} from './pages/IndividualProject/IndividualProject'

import {Route, Routes, useLocation} from 'react-router-dom'
import {ProjectPage} from './pages/Project/Project'
import {AdditionalOptions} from './pages/AdditionalOptions/AdditionalOptions'
import {AboutUs} from './pages/AboutUs/AboutUs'
import {setViewAllProjects} from './redux/actions'
import {getProjectInLocalStorage} from './services/util/localStorage'
import {useAppDispatch} from '@/redux/configure-store'
import {ProjectsList} from "@/pages/new-admin/projects-list/projects-list.page";
import {ProjectInfo} from "@/pages/new-admin/project-info/project-info.component";
import {AdminLayout} from "@/pages/new-admin/admin-layout.component";
import {useGetAllProjects} from "@/api/useGetAllProjects";
import { ExampleProject } from './pages/ExampleProject/ExampleProject'
import Login from './pages/new-admin/login.component'
import AdminGuard from './pages/new-admin/admin-guard.component'
import { LoginLayout } from './pages/new-admin/login-layout.component'


export const App = () => {
    const dispatch = useAppDispatch()
    const {data: projects} = useGetAllProjects()
    const location = useLocation();

    useEffect(() => {
        if (!projects) return;
        const projectInLocalStorage: number[] = getProjectInLocalStorage()
        if (projectInLocalStorage) {
            const filterProjects = projects.filter((elem) => projectInLocalStorage.includes(elem.id))
            dispatch(setViewAllProjects(filterProjects))
        }
    }, [projects])

    return (

            <Routes>

                <Route element={<AdminGuard />}>
                    <Route element={<AdminLayout/>}>
                        <Route path={'/admin/project/new'} element={<ProjectInfo key={location.pathname}/>}/>
                        <Route path={'/admin/project/:projectId'} element={<ProjectInfo key={location.pathname}/>}/>
                        <Route path={'/admin'} element={<ProjectsList/>}/>
                    </Route>
                </Route>

                <Route element={<LoginLayout />}>
                    <Route path={'/login'} element={<Login />} />
                </Route>

                <Route element={<Layout/>}>
                    <Route path={'/'} element={<Main/>}/>

                    <Route path={'/individual-project'} element={<IndividualProject/>}/>

                    <Route path={'/catalogue'} element={<Catalogue/>}/>

                    <Route path={'/catalogue/:projectId'} element={<ProjectPage/>}/>

                    <Route path={'/additional'} element={<AdditionalOptions/>}/>

                    <Route path={'/example-project'} element={<ExampleProject />}/>

                    <Route path={'/about'} element={<AboutUs/>}/>
                </Route>
            </Routes>
       )

}


