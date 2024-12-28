import React, { useState } from 'react'
import { ReactComponent as Logo } from '@/assets/img/logo.svg'
import classes from './Header.module.scss'
import { Container } from '@/containers/hoc/Container/Container'
import { ButtonType, Button } from '@/components/UI/Button/Button'
import MenuIcon from '@/components/Header/MenuIcon/MenuIcon'
import { Menu } from './Menu/Menu'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from './language-switcher.component'

export const Header = () => {
	const [isOpened, setIsOpened] = useState(false)
	const location = useLocation()
	const { t } = useTranslation()

	const headerClasses = [classes['header']]
	// if main page header should be transparent

	if ('/' === location.pathname) {
		headerClasses.push(classes['header--transparent'])
	}

	return (
		<header className={headerClasses.join(' ')}>
			<Container>
				<div className={classes['header__container']}>
					<div className={classes['header__top']}>
						<Link to={'/'} className={createHeaderTopItemClass('header__logo')}>
							<Logo className={classes['header__logo-img']} />
						</Link>

						<a
							className={createHeaderTopItemClass('header__top-item-phone')}
							href='tel:+38 (066) 39-53-654'
						>
							+38 (066) 39-53-654
						</a>

						<LanguageSwitcher
							style={createHeaderTopItemClass('header__top-item-lang')}
						/>

						<div
							className={createHeaderTopItemClass('header__top-item-contact')}
						>
							<a href='#'>
								<Button
									title={t('header.feedback_button')}
									buttonType={ButtonType.TRANSPARENT}
								/>
							</a>
						</div>
						<div
							className={createHeaderTopItemClass('header__top-item-menu')}
							onClick={() => setIsOpened(true)}
						>
							<MenuIcon />
						</div>
					</div>

					<Menu isOpened={isOpened} closeMenu={() => setIsOpened(false)} />
				</div>
			</Container>
		</header>
	)
}


function createHeaderTopItemClass(additionalClass: string) {
	const basicClass: string = classes['header__top-item']

	return [basicClass, classes[additionalClass]].join(' ')
}
