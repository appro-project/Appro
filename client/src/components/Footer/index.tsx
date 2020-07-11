import React from "react";
import Container from "../../containers/hoc/Container/Container";

import {ReactComponent as Logo} from '../../assets/img/logo.svg';

import classes from "./Footer.module.scss";

interface MenuLinkInfo {
    name: string;
    //TODO: Should not be optional!
    url?: string;
}

interface ContactInfo {
    address: string;
    phone: string;
    copyright: string;
}

const slogan: string = "польза, прочность, красота";
const menuLinks: MenuLinkInfo[] = [
    {name: "Главная", url: "/"},
    {name: "Каталог домов", url: "/catalogue"},
    {name: "Индивидуальный проект", url: "/individual"},
    {name: "Реализованные проекты", url: "/finished"},
    {name: "Дополнительные услуги", url: "/additional"},
    {name: "О нас", url: "/about"},
];

const contactInfo: ContactInfo = {
    address: "г. Ирпень, ул. Героев Сталинграда, 13",
    phone: "+38 (066) 39-53-654",
    copyright: "© 2020 Архитектурное Бюро."
}

const Footer = () => {
    return <footer className={classes['footer']}>
        <Container>
            <div className={classes['footer__container']}>
                <div className={classes['footer__logo']}>
                    <Logo className={classes['footer__logo-img']}/>
                    <div className={classes["footer__logo-slogan"]}>
                        {slogan}
                    </div>
                </div>

                <nav className={classes['footer__nav']}>
                    <ul className={classes["footer__menu-list"]}>
                        {menuLinks.map((link, index) =>
                            <MenuItem key={index}
                                      name={link.name}/>)}
                    </ul>
                </nav>

                <div className={classes["footer__address"]}>
                    <div className={classes["footer__address-item"]}>{contactInfo.address}</div>
                    <div className={classes["footer__address-item"]}>
                        <a href={"tel:" + contactInfo.phone}>{contactInfo.phone}</a>
                    </div>
                    <div className={classes["footer__address-item"]}>{contactInfo.copyright}</div>
                </div>
            </div>
        </Container>
    </footer>;
}

// TODO: How can we pass object here?
const MenuItem = (props: MenuLinkInfo) => {
    return <li><a href="#" className={classes["footer__menu-link"]}>{props.name}</a></li>;
}

export default Footer;