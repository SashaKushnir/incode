import React, { FC, useCallback, useState } from 'react'
import { Box, Fab, IconButton, SxProps, Theme } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { downloadCSV } from '../../../utils/downloadCsv'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../../store/store'
import { setDrawerOpened } from '../../../store/slices/historyDrawer/historyDrawerSlice'
import { buttonSx, menusSx } from './fabMenuStyles'
import { charactersSelector } from '../../../store/slices/charactersFilter/selectors'

interface FabMenuProps {
	disableCharactersDownload?: boolean
	fabSx: SxProps<Theme>
}

export const FabMenu: FC<FabMenuProps> = ({
	disableCharactersDownload,
	fabSx
}) => {
	const [menuOpened, setMenuOpened] = useState(false)
	const characters = useSelector(charactersSelector)
	const d = useAppDispatch()

	const openMenuButtons = useCallback(() => {
		setMenuOpened(prev => !prev)
	}, [])
	const handleDownloadFile = useCallback(() => {
		if (characters) downloadCSV(characters, 'characters.csv')
	}, [])
	const handleOpenHistoryDrawer = useCallback(() => {
		d(setDrawerOpened(true))
	}, [d, setDrawerOpened])
	return (
		<Box sx={fabSx}>
			<Fab onClick={openMenuButtons} size={'large'}>
				{menuOpened ? (
					<CloseOutlinedIcon color={'warning'} />
				) : (
					<MoreVertIcon color={'warning'} />
				)}
			</Fab>
			{menuOpened && (
				<Box sx={menusSx}>
					<IconButton
						sx={buttonSx}
						onClick={handleDownloadFile}
						color={'warning'}
						size={'medium'}
						disabled={disableCharactersDownload}
					>
						<FileDownloadOutlinedIcon />
					</IconButton>
					<IconButton
						sx={buttonSx}
						onClick={handleOpenHistoryDrawer}
						color={'warning'}
						size={'medium'}
					>
						<ErrorOutlineOutlinedIcon />
					</IconButton>
				</Box>
			)}
		</Box>
	)
}
