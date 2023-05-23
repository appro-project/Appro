import { FC, ReactNode } from 'react'

import classes from './Wrapper.module.scss'

interface Props {
	children: ReactNode;
}

export const Wrapper:FC<Props> = ({ children }) => {
	return <div className={classes['wrapper']}>{children}</div>
}

