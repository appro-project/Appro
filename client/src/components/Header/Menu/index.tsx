import React from 'react';

import classes from './Menu.module.scss';
import { ReactComponent as Logo } from 'assets/img/logo.svg';
import { menuLinks, contactInfo, MenuLinkInfo } from 'constants/index';
import { Link } from 'react-router-dom';

interface Props {
    isOpened: boolean;

    closeMenu(): void;
}

const Menu = (props: Props) => {
    const menuClasses: string[] = [classes['menu']];
    if (props.isOpened) {
        menuClasses.push(classes['active']);
    }

    return <div className={ menuClasses.join(' ') }>
        <div className={ classes['menu__header'] }>
            <a className={ classes['menu__logo'] } href="/">
                <Logo/>
            </a>
            <div className={ classes['menu__close'] } onClick={ props.closeMenu }/>
        </div>
        <nav className={ classes['menu__body'] }>
            <ul className={ classes['menu__list'] }>
                { menuLinks.map((link, index) =>
                    <MenuItem key={ index } name={ link.name } path={ link.path }/>) }
            </ul>
        </nav>

        <div className={ classes['menu__footer'] }>
            <div className={ classes['menu__footer-item'] }>{ contactInfo.address }</div>
            <div className={ classes['menu__footer-item'] }>
                <a href={ `tel:${contactInfo.phone}` }>{ contactInfo.phone }</a>
            </div>
            <div className={ classes['menu__footer-item'] }>{ contactInfo.copyright }</div>
        </div>
    </div>;
};

export default Menu;

const MenuItem = (props: MenuLinkInfo) => {
    return <li>
        <Link to={ props.path } className={ classes['menu__link'] }>{ props.name }</Link>
    </li>;
};
