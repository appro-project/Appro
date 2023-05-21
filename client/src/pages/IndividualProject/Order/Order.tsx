import React from 'react'

import classes from './Order.module.scss'
import ContactForm from './ContactForm/ContactForm'

const Order = React.memo(() => {
  return (
    <div className={classes['order']}>
      <h3 className={classes['order__title']}>Заказать индивидуальный проект</h3>
      <div className={classes['order__description']}>
        <p>Заказать индивидуальный проект и проконсультироваться по этому вопросу можно по телефону:</p>

        <p className={classes['order__phone']}>
          <a href="tel:+38 (044) 221 36 36">+38 (044) 221 36 36</a>
        </p>
        <p className={classes['order__phone']}>
          <a href="tel:+38 (067) 234 36 36">+38 (067) 234 36 36</a>
        </p>

        <p>Или заполнив форму ниже. После получения заявки, мы вам перезвоним.</p>
      </div>

      <ContactForm />
    </div>
  );
});

export default Order;
