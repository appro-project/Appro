import React from 'react';
import classes from './GeneralInfo.module.scss';
import ImageCarousel from '../ImageCarousel';
import InfoCard, { InfoCardProps } from './InfoCard';

interface Props extends InfoCardProps {
  images: string[];
}

const GeneralInfo = (props: Props) => {
  return (
    <section>
      <div className={classes.GeneralInfo_Wrapper}>
        <div className={classes.GeneralInfo_Images}>
          <ImageCarousel images={props.images} />
        </div>
        <InfoCard
          title={props.title}
          generalArea={props.generalArea}
          timeToCreate={props.timeToCreate}
          projectPrice={props.projectPrice}
        />
      </div>
    </section>
  );
};

export default GeneralInfo;
