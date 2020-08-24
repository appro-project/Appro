import React from 'react';

import classes from './Feedback.module.scss';
import Container from '../../../containers/hoc/Container';
import TextInput from '../../../components/UI/TextInput';

const Feedback = () => {
    return (<section className={ classes['feedback'] }>
            <Container>
                <div className={ classes['popular-categories__title'] }>
                    Популярные категории
                </div>
                <div className={ classes['feedback__container'] }>
                    <div className={ classes['feedback__header'] }>
                        Остались вопросы? Напишите нам!
                    </div>

                    <div className={ classes['feedback__body'] }>
                        <form action="" className={ classes['feedback__form'] }>
                            <div className={ classes['feedback__input'] }>
                                <TextInput placeholder="Имя"/>
                                <div className={ classes['feedback__input'] }>
                                    <TextInput placeholder="E-mail"/>
                                </div>
                                <div className={ classes['feedback__input'] }>
                                    <TextInput placeholder="Номер телефона (необязательно)"/>
                                </div>
                                <div className={ classes['feedback__input'] }>
                                    { /*<input type="text" placeholder="Ваше сообщение">*/}
                                </div>
                                <div className="button button--big feedback__submit">
                                    Отправить сообщение
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Feedback;
