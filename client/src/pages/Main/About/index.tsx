import React, {useState} from 'react';
import classes from './About.module.scss';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import team_photo from '../../../assets/img/main/about/team_photo.jpg';
import certificate from '../../../assets/img/main/about/certificate.jpg';
import Container from '../../../containers/hoc/Container';
import Button from '../../../components/UI/Button';

const About: React.FC = () => {

    const [isOpen, setOpen] = useState(false);

    return <section className={classes['about']}>
        <Container>
            <div className={classes['about__title']}>
                О нас
            </div>
            <div className={classes['about__body']}>
                <div className={classes['about__photo']}>
                    <img src={team_photo} alt="Team photo"/>
                </div>
                <div className={classes['about__certificate']} onClick={() => setOpen(true)}>
                    {isOpen && (
                        <Lightbox
                            mainSrc={certificate}
                            onCloseRequest={() => setOpen(false)}
                        />
                    )}
                    <img src={certificate} alt="certificate"/>
                </div>
                <div className={classes['about__description']}>
                    <div className={classes['about__description-text']}>
                        <p>В 1998 году по окончании Приднепровской государственной академии строительства и
                            архитектуры
                            освоив теорию приступил к строительно-ремонтной практике.</p>

                        <p>С 2002 года вернулся к проектной деятельности архитектором в Коммунальное
                            предприятие
                            "Архитектурно-планировочное бюро".</p>
                        <p>С 2006 года организовал архитектурную мастерскую.</p>
                        <p> С 2012 года директор КП "АПБ".</p>

                        <p>В 2013 году получил квалификационный сертификат архитектора.</p>
                    </div>
                    <div className={classes['about__description-details']}>
                        <Button title="Подробнее"/>
                    </div>
                </div>
            </div>
        </Container>
    </section>;
};

export default About;
