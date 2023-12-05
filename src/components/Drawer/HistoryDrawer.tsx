import React, { FC, useCallback } from 'react'
import { Box, Button, Drawer, List, ListItem, Typography } from '@mui/material'
import { setDrawerOpened } from '../../store/slices/historyDrawer/historyDrawerSlice'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../store/store'
import { LocalStore } from '../../utils/localStorage'
import { closeButtonSx, drawerSx } from './drawerStyles'
import { FilteringValues } from '../../assets/types/types'
import { drawerOpenedSelector } from '../../store/slices/historyDrawer/selectors'

export const HistoryDrawer: FC = ({}) => {
	const open = useSelector(drawerOpenedSelector)
	const d = useAppDispatch()
	const history = LocalStore.get('history')
	const onClose = useCallback(() => {
		d(setDrawerOpened(false))
	}, [d, setDrawerOpened])
	const closeDrawer = useCallback(() => {
		d(setDrawerOpened(false))
	}, [d, setDrawerOpened])
	return (
		<Drawer sx={drawerSx} anchor={'right'} open={open} onClose={closeDrawer}>
			<Typography fontSize={'20px'} fontWeight={500} p={'8px 16px'}>
				History
			</Typography>
			<List sx={{ overflow: 'auto', flexGrow: 1 }}>
				{history?.map((item, index) => {
					if (item.name)
						return (
							<ListItem key={index}>
								Character {item.name} was reviewed
							</ListItem>
						)
					else if (item.values || item.filterType) {
						return (
							<ListItem key={index} sx={{ flexWrap: 'wrap' }}>
								Filtered by {item.filterType}: {'{'}
								{Object.keys(item.values as FilteringValues)
									.filter(keys =>
										item.values
											? item.values[keys as keyof FilteringValues]
											: false
									)
									.map((key, index, { length }) => {
										const displayField =
											key +
											': ' +
											(item.values
												? item.values[key as keyof FilteringValues] +
												  (index === length - 1 ? '.' : ',\u00A0')
												: '')
										console.log(displayField, 'disp field')
										return <Box key={key}>{displayField}</Box>
									})}
								{'}'}
							</ListItem>
						)
					}
				})}
			</List>
			<Typography sx={closeButtonSx} onClick={onClose}>
				Close
			</Typography>
		</Drawer>
	)
}
