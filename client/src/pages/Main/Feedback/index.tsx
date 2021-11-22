import React from 'react';

import classes from './Feedback.module.scss';
import Container from '../../../containers/hoc/Container';
import TextInput from '../../../components/UI/TextInput';
import Button, {ButtonType} from '../../../components/UI/Button';

const Feedback: React.FC = () => {
    return (<section className={classes['feedback']}>
            <Container>
                <div className={classes['feedback__header']}>
                    Остались вопросы? Напишите нам!
                </div>

                <div className={classes['feedback__body']}>
                    <form action="" className={classes['feedback__form']}>
                        <div className={classes['feedback__input']}>
                            <TextInput placeholder="Имя"/>
                        </div>
                        <div className={classes['feedback__input']}>
                            <TextInput placeholder="E-mail"/>
                        </div>
                        <div className={classes['feedback__input']}>
                            <TextInput placeholder="Номер телефона (необязательно)"/>
                        </div>

                        { /*TODO: Where is form?!??!!?!?!?*/}
                        <div className={classes['feedback__input']}>
                            { /*<input type="text" placeholder="Ваше сообщение">*/}
                        </div>
                        <Button buttonType={ButtonType.BIG} title="Отправить сообщение"/>
                    </form>
                </div>
            </Container>
        </section>
    );
};

export default Feedback;
