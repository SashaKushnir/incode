import React, { FC, useCallback } from 'react'
import { Box, Drawer, List, ListItem, Typography } from '@mui/material'
import { setDrawerOpened } from '../../store/slices/historyDrawer/historyDrawerSlice'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../store/store'
import { LocalStore } from '../../utils/localStorage'
import { drawerSx } from './drawerStyles'
import { FilteringValues } from '../../assets/types/types'
import { drawerOpenedSelector } from '../../store/slices/historyDrawer/selectors'

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
						return (
							<ListItem key={index}>
								Character {item.name} was reviewed
							</ListItem>
						)
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
