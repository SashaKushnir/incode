import React, {
	Dispatch,
	SetStateAction,
	SyntheticEvent,
	useRef,
	useState
} from 'react'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import { Box, Button, MenuList, SxProps, Theme } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import {
	FilteringConfig,
	FilterType
} from '../../../../components/forms/CharactersFilter/CharactersFilter'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { CustomMenuPopper } from '../../CustomMenuPopper/CustomMenuPopper'

interface MultiSelectProps {
	options: FilterType[]
	open: boolean
	setOpen: Dispatch<SetStateAction<boolean>>
}

export const SelectOptionButtonSx: SxProps<Theme> = ({ palette }) => ({
	borderRadius: '4px 4px 0px 0px',
	padding: '16px',
	background: palette.secondary.main,
	color: palette.primary.dark,
	textOverflow: 'ellipsis',
	display: 'flex',
	justifyContent: 'space-between',
	width: '215px',
	zIndex: 10,
	':hover': {
		background: palette.secondary.contrastText
	}
})

export const MultiSelect: React.FC<MultiSelectProps> = ({
	options,
	open,
	setOpen
}) => {
	const anchorRef = useRef(null)
	const { setValue, getValues } = useFormContext<FilteringConfig>()
	const handleToggle = (e: SyntheticEvent<Element, Event>) => {
		setOpen(prevOpen => !prevOpen)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const handleSelect = (value: FilterType) => {
		setValue('filterType', value)
	}

	return (
		<Box>
			<>
				<Button
					ref={anchorRef}
					id='composition-button'
					sx={SelectOptionButtonSx}
					onClick={handleToggle}
				>
					<span>Select Item</span>
					<ArrowDropDownIcon />
				</Button>
				<CustomMenuPopper anchorRef={anchorRef} open={open}>
					<MenuList
						autoFocusItem={open}
						id='composition-menu'
						aria-labelledby='composition-button'
						sx={{ width: '100%' }}
					>
						{options.map(option => (
							<MenuItem
								onClick={() => handleSelect(option)}
								key={option}
								sx={{
									width: '100%',
									display: 'flex',
									justifyContent: 'space-between'
								}}
								value={option}
							>
								{option}
								<Controller<FilteringConfig, 'filterType'>
									name={'filterType'}
									render={({ field, fieldState, formState }) => {
										return (
											<Checkbox
												checked={field.value === option}
												color={'info'}
											/>
										)
									}}
								/>
							</MenuItem>
						))}
					</MenuList>
				</CustomMenuPopper>
			</>
			{open && (
				<div
					onClick={handleClose}
					style={{
						position: 'fixed',
						top: 0,
						right: 0,
						bottom: 0,
						left: 0,
						backgroundColor: 'rgba(0, 0, 0, 0.8)',
						zIndex: 9 // Adjust the zIndex as needed
					}}
				/>
			)}
		</Box>
	)
}
