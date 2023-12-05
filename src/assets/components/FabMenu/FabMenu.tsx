import React, { FC, useCallback, useState } from 'react'
import { Box, Fab, IconButton, SxProps, Theme } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { downloadCSV } from '../../../utils/downloadCsv'
import { useSelector } from 'react-redux'
import { charactersSelector } from '../../../store/slices/charactersFilterSlice'
import { useAppDispatch } from '../../../store/store'
import { setDrawerOpened } from '../../../store/slices/historyDrawerSlice'

interface FabMenuProps {
	disableCharactersDownload?: boolean
	fabSx: SxProps<Theme>
}

export const buttonSx: SxProps<Theme> = ({ palette }) => ({
	background: palette.secondary.main,
	':hover': {
		background: palette.secondary.contrastText,
		color: palette.warning.main
	},
	':disabled': {
		background: palette.grey[100]
	}
})
export const menusSx: SxProps<Theme> = ({ palette }) => ({
	position: 'absolute',
	bottom: '70px',
	left: '50%',
	transform: 'translate(-50%, 0%)',
	display: 'flex',
	flexDirection: 'column',
	gap: '16px'
})

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
