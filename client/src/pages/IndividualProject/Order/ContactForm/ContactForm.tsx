import classes from '../Order.module.scss';
import TextInput from '../../../../components/UI/TextInput';
import TextArea from '../../../../components/UI/TextArea';
import Button, { ButtonType } from '../../../../components/UI/Button';
import React from 'react';

const ContactForm: React.FC = React.memo(() => {
  return (
    <form className={classes['order__form']}>
      <div className={classes['order__input']}>
        <TextInput placeholder="Имя" />
      </div>
      <div className={classes['order__input']}>
        <TextInput placeholder="Номер телефона" type="tel" />
      </div>
      <div className={classes['order__input']}>
        <TextArea placeholder="Сообщение (необязательно)" />
      </div>

      <div className={classes['order__submit']}>
        <Button title="Отправить сообщение" buttonType={ButtonType.BIG} />
      </div>
    </form>
  );
});

export default ContactForm;
