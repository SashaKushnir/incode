import React, { Dispatch, SetStateAction, SyntheticEvent, useRef } from 'react'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import { Box, Button, MenuList } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { CustomMenuPopper } from '../../CustomMenuPopper/CustomMenuPopper'
import { menuItemSx, SelectOptionButtonSx } from './multiselectStyles'
import { FilteringConfig, FilterType } from '../../../types/types'

interface MultiSelectProps {
	options: FilterType[]
	open: boolean
	setOpen: Dispatch<SetStateAction<boolean>>
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
	options,
	open,
	setOpen
}) => {
	const anchorRef = useRef(null)
	const { setValue, resetField } = useFormContext<FilteringConfig>()
	const handleToggle = (_e: SyntheticEvent<Element, Event>) => {
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
								sx={menuItemSx}
								value={option}
							>
								{option}
								<Controller<FilteringConfig, 'filterType'>
									name={'filterType'}
									render={({ field }) => {
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
						zIndex: 9
					}}
				/>
			)}
		</Box>
	)
}
