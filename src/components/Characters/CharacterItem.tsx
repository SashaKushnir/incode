import React, { FC, PropsWithChildren, useMemo } from 'react'
import { Character } from '../../api'
import { Box, SxProps, Theme, Typography } from '@mui/material'
import { Image } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

interface CharacterItemProps {
	character: Character
	expandedVersion?: boolean
}

export const characterImgSx: SxProps<Theme> = ({ palette }) => ({
	width: '229px',
	height: '220px'
})
export const characterImgExpandedSx: SxProps<Theme> = ({ palette }) => ({
	width: '595px',
	height: '572px'
})
export const statusSx: SxProps<Theme> = () => ({
	width: '9px',
	height: '9px',
	borderRadius: '50%'
})
export const infoExpandedWrapperSx: SxProps<Theme> = ({ palette }) => ({
	padding: '24px 26px'
})
export const infoWrapperSx: SxProps<Theme> = ({ palette }) => ({
	padding: '12px 13px'
})
export const characterContainerSx: SxProps<Theme> = ({ palette }) => ({
	background: palette.primary.contrastText,
	borderRadius: '9px',
	display: 'flex',
	overflow: 'hidden'
})

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
	const handleOpenDetails = () => {
		nav('character/' + character.id)
	}

	const episodeName = useMemo(
		() =>
			character.episode?.find(e => {
				return e?.created
			})?.name,
		[character]
	)

	return (
		<Box sx={characterContainerSx}>
			<Box
				component={'img'}
				sx={expandedVersion ? characterImgExpandedSx : characterImgSx}
				src={character.image || ''}
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
					{character.name}
				</Typography>
				<Box
					display={'flex'}
					alignItems={'center'}
					gap={'15px'}
					color={({ palette }) => palette.secondary.main}
					fontWeight={500}
					fontSize={'16px'}
				>
					<Box
						sx={statusSx}
						bgcolor={statusColorMap[character.status || 'Unknown']}
					/>
					{character.status + ' - ' + character.species}
				</Box>
				<CharacterInformationItem
					title={'Last known location:'}
					subtitle={character.location?.name}
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
							subtitle={character.gender}
						/>
						<CharacterInformationItem
							title={'Created:'}
							subtitle={character.created}
						/>
						<CharacterInformationItem
							title={'Origin Name:'}
							subtitle={character.origin?.name}
						/>
						<CharacterInformationItem
							title={'Origin Dimension:'}
							subtitle={character.origin?.dimension}
						/>
					</>
				)}
			</Box>
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
		<Box>
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