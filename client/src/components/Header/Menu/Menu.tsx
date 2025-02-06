import classes from './Menu.module.scss'
import { ReactComponent as Logo } from '@/assets/img/logo.svg'
import { contactInfo, MenuLinkInfo, menuLinks } from '@/constants'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface Props {
	isOpened: boolean

	closeMenu(): void
}

export const Menu = (props: Props) => {
	const menuClasses: string[] = [classes['menu']]
	if (props.isOpened) {
		menuClasses.push(classes['active'])
	}
	const { t } = useTranslation()
	return (
		<div className={menuClasses.join(' ')}>
			<div className={classes['menu__header']}>
				<a className={classes['menu__logo']} href='/'>
					<Logo />
				</a>
				<div className={classes['menu__close']} onClick={props.closeMenu} />
			</div>
			<nav className={classes['menu__body']}>
				<ul className={classes['menu__list']}>
					{menuLinks.map((link, index) => (
						<div onClick={props.closeMenu}>
							<MenuItem key={index} name={t(link.name)} path={link.path}/>
						</div>
					))}
				</ul>
			</nav>

			<div className={classes['menu__footer']}>
				<div className={classes['menu__footer-item']}>
					{t(contactInfo.address)}
				</div>
				<div className={classes['menu__footer-item']}>
					<a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
				</div>
				<div className={classes['menu__footer-item']}>
					{t(contactInfo.copyright)}
				</div>
			</div>
		</div>
	)
}

const MenuItem = (props: MenuLinkInfo) => {
	return (
		<li>
			<Link to={props.path} className={classes['menu__link']}>
				{props.name}
			</Link>
		</li>
	)
}
