import { useState } from 'react'
import GeneralInfo from '../GeneralInfo/GeneralInfo'
import { ProjectLayout } from '../ProjectLayout/ProjectLayout'
import { ProjectStructure } from '../ProjectStructure/ProjectStructure'
import { Changes } from '../Changes/Changes'
import { Additional } from '../Additional/Additional'
import { VisitedProjects } from '@/containers/VisitedProjects/VisitedProjects'
import { IProjectTubsName, tubsArray } from '../interfaces'
import classes from '@/components/UI/Tabs/Tabs.module.scss'
import { Tab } from '@/components/UI/Tabs/Tab/Tab'
import {ProjectDto} from "@/api/model";
import { useTranslation } from 'react-i18next'

interface Props {
	project: ProjectDto;
}

export const ProjectTabs = ({ project }: Props) => {
	const [activeTab, setActiveTab] = useState<IProjectTubsName>(tubsArray[0])

	const onClickTabItem = (value: IProjectTubsName) => {
		setActiveTab(value)
	}

	const {t} = useTranslation();

	return (
		<>
			<div id='scroll-to-top' className={classes.Tabs}>
				<ol className={classes.TabsList}>
					{tubsArray
						.filter(element => project.isFinished || element !== IProjectTubsName.PROJECT_IN_PROGRESS)
						.map((element, index) => {
						return <Tab activeTab={activeTab === element} key={index} label={t(element)} onClick={onClickTabItem} />
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
								images={[project.mainImage?.path, ...project.images.map((image) => image.path)]}
								description={project.description}
							/>
							<ProjectLayout project={project} />
							<ProjectStructure project={project} />
							<Changes project={project} />
							<Additional />
							{project.isFinished && 
								<GeneralInfo
									title={project.title}
									generalArea={project.generalArea}
									projectPrice={project.projectPrice}
									timeToCreate={project.timeToCreate}
									images={project.photos.map((image) => image.path)}
									description={project.description}
								/>
							}
						</>
					)}
					{activeTab === IProjectTubsName.LAYAOUT && <ProjectLayout project={project} />}
					{/*{activeTab === IProjectTubsName.SIMILAR_PROJECTS && <VisitedProjects />}*/}
					{activeTab === IProjectTubsName.ADDITIONAL_SERVICES && <Additional />}
					{activeTab === IProjectTubsName.COMPOSITION_OF_PROJECT && <ProjectStructure project={project} />}
					{activeTab === IProjectTubsName.ALTERNATIVE && <Changes project={project} />}
					{project.isFinished && activeTab === IProjectTubsName.PROJECT_IN_PROGRESS 
						&& <GeneralInfo
							title={project.title}
							generalArea={project.generalArea}
							projectPrice={project.projectPrice}
							timeToCreate={project.timeToCreate}
							images={project.photos.map((photo) => photo.path)}
						/>}
				</div>
				<VisitedProjects />
			</div>
		</>
	)
}

