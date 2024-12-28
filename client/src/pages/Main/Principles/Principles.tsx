import { Container } from '@/containers/hoc/Container/Container'
import classes from './Principles.module.scss'
import { PrincipleItem } from './PrincipleItem/PrincipleItem'
import { PrincipleItemData } from '@/entity/PrincipleItemData'
import { useTranslation } from 'react-i18next'

interface PropsType {
  principlesData: PrincipleItemData[];
}

export const Principles = ({ principlesData }: PropsType) => {
  const {t} = useTranslation();

  return (
		<section className={classes.principles}>
			<Container>
				<div className={classes.principles__container}>
					<div className={classes.principles__title}>
						{t('main.principles.title')}
					</div>

					<div className={classes.principles__body}>
						{principlesData.map((principle, index) => (
							<PrincipleItem key={index} principleItem={principle} />
						))}
					</div>
				</div>
			</Container>
		</section>
	)
};

