import classes from './GeneralInfo.module.scss'
import { ImageCarousel } from '../ImageCarousel/ImageCarousel'
import { InfoCard, InfoCardProps } from './InfoCard'
import { FC } from 'react'

import { useTranslation } from 'react-i18next'

interface GeneralInfoProps extends InfoCardProps {
	images: string[]
	description?: string
}

export const GeneralInfo: FC<GeneralInfoProps> = ({
	images,
	description,
	title,
	generalArea,
	timeToCreate,
	projectPrice
}) => {
	const {t} = useTranslation();

	return (
		<section>
			<div className={classes.GeneralInfo_Wrapper}>
				<div className={classes.GeneralInfo_Images}>
					<ImageCarousel images={images} />
				</div>
				<InfoCard
					title={title}
					generalArea={generalArea}
					timeToCreate={timeToCreate}
					projectPrice={projectPrice}
				/>
			</div>
			{description && (
				<>
					<p className={classes.GeneralInfo_Text}>
						{t('project.composition.description1')}
					</p>
					<p className={classes.GeneralInfo_Text}>{description}</p>
				</>
			)}
		</section>
	)
}

export default GeneralInfo
