import { Welcome } from './Welcome/Welcome'
import { Popular } from './Popular/Popular'
import { Principles } from './Principles/Principles'
import { Feedback } from './Feedback/Feedback'
import { About } from './About/About'
import { useSelector } from 'react-redux'
import { getPopularCategories, getPrinciplesData, getProjects } from '@/redux/selectors'

export const Main = () => {
	const mockProjects = useSelector(getProjects)
	const popularCategories = useSelector(getPopularCategories)
	const principlesData = useSelector(getPrinciplesData)


	return (
		<>
			<Welcome mockProjects={mockProjects} />
			<Popular popularCategories={popularCategories} />
			<About />
			<Principles principlesData={principlesData} />
			<Feedback />
		</>
	)
}
