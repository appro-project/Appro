import { useState } from 'react'
import GeneralInfo from '../GeneralInfo/GeneralInfo'
import { ProjectLayout } from '../ProjectLayout/ProjectLayout'
import { ProjectStructure } from '../ProjectStructure/ProjectStructure'
import { Changes } from '../Changes/Changes'
import { Additional } from '../Additional/Additional'
import { Gallery } from '../Gallery/Gallery'
import { VisitedProjects } from '@/containers/VisitedProjects/VisitedProjects'
import { Project } from '@/entity/Project'
import { IProjectTubsName, tubsArray } from '../interfaces'
import classes from '@/components/UI/Tabs/Tabs.module.scss'
import { Tab } from '@/components/UI/Tabs/Tab/Tab'

interface Props {
	project: Project;
}

export const ProjectTabs = ({ project }: Props) => {
	const [activeTab, setActiveTab] = useState<IProjectTubsName>(tubsArray[0])

	const onClickTabItem = (value: IProjectTubsName) => {
		setActiveTab(value)
	}

	return (
		<>
			<div id='scroll-to-top' className={classes.Tabs}>
				<ol className={classes.TabsList}>
					{tubsArray.map((element, index) => {
						return <Tab activeTab={activeTab === element} key={index} label={element} onClick={onClickTabItem} />
					})}
				</ol>
				<div className='tab-content'>
					{activeTab === IProjectTubsName.All_ABOUT_PROJECT && (
						<>
							<GeneralInfo
								title={project.title}
								generalArea={project.generalArea}
								projectPrice={project.projectPrice}
								timeToCreate={project.timeToCreate}
								images={project.images}
							/>
							<ProjectLayout project={project} />
							<ProjectStructure project={project} />
							<Changes project={project} />
							<Additional />
							<Gallery />
						</>
					)}
					{activeTab === IProjectTubsName.LAYAOUT && <ProjectLayout project={project} />}
					{/*{activeTab === IProjectTubsName.SIMILAR_PROJECTS && <VisitedProjects />}*/}
					{activeTab === IProjectTubsName.ADDITIONAL_SERVICES && <Additional />}
					{activeTab === IProjectTubsName.COMPOSITION_OF_PROJECT && <ProjectStructure project={project} />}
					{activeTab === IProjectTubsName.ALTERNATIVE && <Changes project={project} />}
					{activeTab === IProjectTubsName.PROJECT_IN_PROGRESS && <Gallery />}
				</div>
				<VisitedProjects />
			</div>
		</>
	)
}

