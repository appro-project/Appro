import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

const languages = {
	ru: 'RU',
	ua: 'UA'
}

interface LanguageSwitcherProps {
	style?: string
}

export const LanguageSwitcher: FC<LanguageSwitcherProps> = ({ style }) => {
	const { i18n } = useTranslation()
	const [lng, setLng] = useState(i18n.language)

	const changeLanguage = (event: SelectChangeEvent<string>) => {
		const lng = event.target.value as keyof typeof languages
		i18n.changeLanguage(lng)
		setLng(lng)
	}
	return (
		<Select
			labelId='language-select-label'
			id='language-select'
			value={lng}
			onChange={changeLanguage}
			IconComponent={() => null}
			sx={{
				'& > fieldset': { border: 'none' },
				'& .MuiSelect-select': { padding: 0 + ' !important' }
			}}
			MenuProps={{
				disableScrollLock: true
			}}
			classes={{ root: style }}
		>
			{Object.keys(languages).map(lng => (
				<MenuItem key={lng} value={lng} >
					{languages[lng as keyof typeof languages]}
				</MenuItem>
			))}
		</Select>
	)
}
