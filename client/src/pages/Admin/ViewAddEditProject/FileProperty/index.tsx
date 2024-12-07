import React, { FC, useRef } from 'react'
import Input from '@mui/material/Input'
import FormControl from '@mui/material/FormControl'
import { Box, Button, CircularProgress, FormLabel } from '@mui/material'

interface FilePropertyProps {
	title: string
	required?: boolean
	multiple?: boolean
	disabled?: boolean
	handleProperty(event: React.ChangeEvent<any>): void
	isLoading?: boolean
}

const FileProperty: FC<FilePropertyProps> = ({
	title,
	required,
	multiple,
	disabled,
	handleProperty,
	isLoading
}) => {
	const hiddenFileInput = useRef<HTMLInputElement | null>(null)

	const handleClick = () => {
		if (hiddenFileInput.current) {
			hiddenFileInput.current.click()
		}
	}

	return (
		<Box sx={{ my: 4 }}>
			<FormControl>
				<Input
					type='file'
					title={title}
					id={`${title}-label`}
					onChange={handleProperty}
					inputProps={{ multiple }}
					disabled={disabled}
					required={required}
					inputRef={hiddenFileInput}
					style={{ display: 'none' }}
				/>
				<Button
					onClick={handleClick}
					variant='contained'
					sx={{
            minWidth: '150px',
						backgroundColor: '#ffb000',
						'&:hover': {
							backgroundColor: '#ffcf42'
						}
					}}
				>
					{isLoading ? (
						<CircularProgress
							size={24}
							sx={{
								color: 'white'
							}}
						/>
					) : (
						title
					)}
				</Button>
			</FormControl>
		</Box>
	)
}

export default FileProperty
