import React, { FC, useCallback, useMemo } from 'react'
import { Character } from '../../api'
import { Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { FabMenu } from '../../assets/components/FabMenu/FabMenu'
import { LocalStore } from '../../utils/localStorage'
import {
	characterContainerSx,
	characterImgSx,
	fabSx,
	infoExpandedWrapperSx,
	infoWrapperSx,
	statusSx
} from './charactersStyles'
import { capitalizeString } from '../../utils/capitalizeLletter'

interface CharacterItemProps {
	character?: Character
	expandedVersion?: boolean
}

const statusColorMap: Partial<Record<string, string>> = {
	Alive: 'rgba(85, 204, 68, 1)',
	Dead: 'rgba(214, 61, 46, 1)',
	unknown: 'rgba(158, 158, 158, 1)'
}

export const CharacterItem: FC<CharacterItemProps> = ({
	character,
	expandedVersion
}) => {
	const nav = useNavigate()

	const handleOpenDetails = useCallback(() => {
		const prevHistory = LocalStore.get('history')
		const newHistoryItem = {
			id: character?.id || '',
			name: character?.name || ''
		}
		LocalStore.set(
			'history',
			prevHistory ? [...prevHistory, newHistoryItem] : [newHistoryItem]
		)
		nav('character/' + character?.id)
	}, [character, nav, LocalStore])

	const episodeName = useMemo(
		() =>
			character?.episode?.find(e => {
				return e?.created
			})?.name,
		[character]
	)

	return (
		<Box sx={characterContainerSx}>
			<Box
				component={'img'}
				sx={characterImgSx}
				style={{ height: expandedVersion ? '500px' : '270px' }}
				src={character?.image || ''}
				alt={'Character image'}
			/>
			<Box sx={expandedVersion ? infoExpandedWrapperSx : infoWrapperSx}>
				<Typography
					color={({ palette }) => palette.secondary.main}
					fontSize={'27px'}
					fontWeight={800}
					sx={{ cursor: 'pointer' }}
					onClick={handleOpenDetails}
				>
					{character?.name}
				</Typography>
				<Typography
					display={'flex'}
					alignItems={'center'}
					gap={'8px'}
					color={({ palette }) => palette.secondary.main}
					fontWeight={500}
					fontSize={'16px'}
				>
					<Box
						sx={statusSx}
						bgcolor={statusColorMap[character?.status || 'Unknown']}
					/>
					{capitalizeString(character?.status || '') +
						' - ' +
						character?.species}
				</Typography>
				<CharacterInformationItem
					title={'Last known location:'}
					subtitle={character?.location?.name}
				/>
				{episodeName && (
					<CharacterInformationItem
						title={'First seen in:'}
						subtitle={episodeName}
					/>
				)}
				{expandedVersion && (
					<>
						<CharacterInformationItem
							title={'Gender:'}
							subtitle={character?.gender}
						/>
						<CharacterInformationItem
							title={'Created:'}
							subtitle={character?.created}
						/>
						<CharacterInformationItem
							title={'Origin Name:'}
							subtitle={character?.origin?.name}
						/>
						<CharacterInformationItem
							title={'Origin Dimension:'}
							subtitle={character?.origin?.dimension}
						/>
					</>
				)}
			</Box>

			{expandedVersion && <FabMenu disableCharactersDownload fabSx={fabSx} />}
		</Box>
	)
}

interface CharacterInformationItemProps {
	title?: string
	subtitle?: string | null
}

const CharacterInformationItem: FC<CharacterInformationItemProps> = ({
	title,
	subtitle
}) => {
	return (
		<Box mt={'14px'}>
			<Typography
				color={({ palette }) => palette.grey[100]}
				fontWeight={500}
				fontSize={'15px'}
				lineHeight={'26px'}
			>
				{title}
			</Typography>
			<Typography
				fontSize={'18px'}
				fontWeight={400}
				lineHeight='29px'
				color={({ palette }) => palette.secondary.main}
			>
				{subtitle}
			</Typography>
		</Box>
	)
}
