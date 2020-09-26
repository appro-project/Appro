import React from 'react';

import classes from './Order.module.scss';
import TextInput from '../../../components/UI/TextInput';
import TextArea from '../../../components/UI/TextArea';
import Button, { ButtonType } from '../../../components/UI/Button';

const Order = () => {
  return <div className={ classes['order'] }>
    <h3 className={ classes['order__title'] }>Заказать индивидуальный проект</h3>
    <div className={ classes['order__description'] }>
      <p>Заказать индивидуальный проект и проконсультироваться по этому вопросу можно по
        телефону:</p>

      <p className={ classes['order__phone'] }>
        <a href="tel:+38 (044) 221 36 36">+38 (044) 221 36 36</a>
      </p>
      <p className={ classes['order__phone'] }>
        <a href="tel:+38 (067) 234 36 36">+38 (067) 234 36 36</a>
      </p>

      <p>Или заполнив форму ниже. После получения заявки, мы вам перезвоним.</p>
    </div>

    <form className={ classes['order__form'] }>
      <div className={ classes['order__input'] }>
        <TextInput placeholder="Имя"/>
      </div>
      <div className={ classes['order__input'] }>
        <TextInput placeholder="Номер телефона" type="tel"/>
      </div>
      <div className={ classes['order__input'] }>
        <TextArea placeholder="Сообщение (необязательно)"/>
      </div>

      <div className={ classes['order__submit'] }>
        <Button title="Отправить сообщение" buttonType={ ButtonType.BIG }/>
      </div>
    </form>
  </div>;
};

export default Order;
