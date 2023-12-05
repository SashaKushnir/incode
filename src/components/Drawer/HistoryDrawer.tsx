import React, { FC, useCallback } from 'react'
import {
	Box,
	Drawer,
	List,
	ListItem,
	SxProps,
	Theme,
	Typography
} from '@mui/material'
import {
	drawerOpenedSelector,
	setDrawerOpened
} from '../../store/slices/historyDrawerSlice'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../store/store'
import { LocalStore } from '../../utils/localStorage'
import { FilteringValues } from '../forms/CharactersFilter/CharactersFilter'

interface DrawerProps {}

const drawerSx: SxProps<Theme> = () => ({
	'& .MuiDrawer-paper': {
		height: '50vh',
		top: '25%',

		width: '400px',
		borderRadius: '9px 0px 0px 9px'
	}
})

export const HistoryDrawer: FC = ({}) => {
	const open = useSelector(drawerOpenedSelector)
	const d = useAppDispatch()
	const history = LocalStore.get('history')

	const closeDrawer = useCallback(() => {
		d(setDrawerOpened(false))
	}, [d, setDrawerOpened])
	return (
		<Drawer sx={drawerSx} anchor={'right'} open={open} onClose={closeDrawer}>
			<Typography fontSize={'20px'} fontWeight={500} p={'8px 16px'}>
				History
			</Typography>
			<List sx={{ overflow: 'auto' }}>
				{history?.map((item, index) => {
					if (item.name)
						return <ListItem>Character {item.name} was reviewed</ListItem>
					else if (item.values || item.filterType) {
						return (
							<ListItem key={index}>
								Filtered By {item.filterType}:
								{Object.keys(item.values as FilteringValues)
									.filter(keys =>
										item.values
											? item.values[keys as keyof FilteringValues]
											: false
									)
									.map(key => {
										return (
											<Box key={key}>
												{key +
													': ' +
													(item.values
														? item.values[key as keyof FilteringValues]
														: '')}
											</Box>
										)
									})}
							</ListItem>
						)
					}
				})}
			</List>
		</Drawer>
	)
}
