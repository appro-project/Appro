import { Welcome } from './Welcome/Welcome'
import { Popular } from './Popular/Popular'
import { Principles } from './Principles/Principles'
import { Feedback } from './Feedback/Feedback'
import { About } from './About/About'
import { useSelector } from 'react-redux'
import { getPopularCategories, getPrinciplesData, getProjects } from '@/redux/selectors'
import {useGetAllProjects} from "@/api/useGetAllProjects";

export const Main = () => {
	const {data:projects} = useGetAllProjects();
	const mockProjects = useSelector(getProjects)
	const popularCategories = useSelector(getPopularCategories)
	const principlesData = useSelector(getPrinciplesData)

	if(!projects) return <div>Loading...</div>

	const welcomeProjects = projects.filter((project) => project.showOnMain);
	return (
		<>
			<Welcome mockProjects={welcomeProjects} />
			<Popular popularCategories={popularCategories} />
			<About />
			<Principles principlesData={principlesData} />
			<Feedback />
		</>
	)
}
