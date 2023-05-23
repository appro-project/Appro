import { Container } from '@/containers/hoc/Container/Container'
import classes from './Principles.module.scss'
import { PrincipleItem } from './PrincipleItem/PrincipleItem'
import { PrincipleItemData } from '@/entity/PrincipleItemData'

interface PropsType {
  principlesData: PrincipleItemData[];
}

export const Principles = ({ principlesData }: PropsType) => {
  return (
    <section className={classes.principles}>
      <Container>
        <div className={classes.principles__container}>
          <div className={classes.principles__title}>Наши принципы</div>

          <div className={classes.principles__body}>
            {principlesData.map((principle, index) => (
              <PrincipleItem key={index} principleItem={principle} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

