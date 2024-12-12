import classes from './GeneralInfo.module.scss'
import { ImageCarousel } from '../ImageCarousel/ImageCarousel'
import { InfoCard, InfoCardProps } from './InfoCard'
import { FC } from 'react'

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
						Приобретая проект дома в Архитектурном бюро, вы получаете комплект
						чертежей - 2 экземпляра, необходимый для проведения строительных
						работ и беспрепятственного получения разрешения на строительство.
					</p>
					<p className={classes.GeneralInfo_Text}>{description}</p>
				</>
			)}
		</section>
	)
}

export default GeneralInfo
