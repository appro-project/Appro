import React, {useState} from "react";
import {ReactComponent as Logo} from '../../assets/img/logo.svg';
import classes from "./Header.module.scss";
import Container from "containers/hoc/Container";
import Button, {ButtonType} from "components/UI/Button";
import MenuIcon from "components/Header/MenuIcon";
import Menu from "./Menu";

const Header = () => {
    const [isOpened, setIsOpened] = useState(false);

    return <header className={classes['header']}>
        <Container>
            <div className={classes['header__container']}>
                <div className={classes["header__top"]}>
                    <a className={createHeaderTopItemClass("header__logo")} href="#">
                        <Logo className={classes["header__logo-img"]}/>
                    </a>

                    <a className={createHeaderTopItemClass("header__top-item-phone")}
                       href="tel:+38 (066) 39-53-654">+38 (066) 39-53-654</a>

                    <a className={createHeaderTopItemClass("header__top-item-lang")} href="#">RU</a>

                    <div className={createHeaderTopItemClass("header__top-item-contact")}>
                        <a href="#">
                            <Button title={"Обратная связь"} buttonType={ButtonType.TRANSPARENT}/>
                        </a>
                    </div>
                    <div className={createHeaderTopItemClass("header__top-item-menu")}
                         onClick={() => setIsOpened(true)}>
                        <MenuIcon/>
                    </div>
                </div>

                <Menu isOpened={isOpened} closeMenu={() => setIsOpened(false)}/>

            </div>
        </Container>
    </header>
}

export default Header;

function createHeaderTopItemClass(additionalClass: string) {
    const basicClass: string = classes["header__top-item"];
    return [basicClass, classes[additionalClass]].join(" ");
}