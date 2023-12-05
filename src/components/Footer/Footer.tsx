import React, { FC } from 'react'
import { Box, Typography } from '@mui/material'
import incodeLogoSrc from 'assets/images/incode-icon.svg'
import githubSrc from 'assets/images/github-icon.svg'
import twitterSrc from 'assets/images/twitter-icon.svg'
import supportSrc from 'assets/images/support-icon.svg'
import { footerSx, imgSx } from './footerStyles'

export const Footer: FC = ({}) => {
	return (
		<Box component={'footer'} sx={footerSx}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: '20px',
					position: 'relative'
				}}
			>
				<Typography
					color={({ palette }) => palette.grey[100]}
					fontSize={'14px'}
					fontWeight={700}
					mb={'14px'}
				>
					PERFORMED AS PART OF A TEST
					<br /> CASE FOR THE COMPANY
				</Typography>

				<Box sx={{ position: 'relative' }}>
					<Box
						sx={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							width: '200px',
							height: '200px',
							transform: 'translate(-50%, -50%)',
							background:
								'radial-gradient(rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 60%)',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					/>
					<Box
						component={'img'}
						sx={{
							width: '50px',
							height: '50px',
							position: 'relative',
							zIndex: 1
						}}
						src={incodeLogoSrc}
					/>
				</Box>
				<Box
					mt={'36px'}
					sx={{ display: 'flex', justifyContent: 'center', gap: '27px' }}
				>
					<Box component={'img'} sx={imgSx} src={githubSrc} alt={'github'} />
					<Box component={'img'} sx={imgSx} src={twitterSrc} alt={'twitter'} />
					<Box component={'img'} sx={imgSx} src={supportSrc} alt={'support'} />
				</Box>
				<Typography
					color={({ palette }) => palette.grey[100]}
					fontSize={'12px'}
					fontWeight={400}
				>
					2023
				</Typography>
			</Box>
		</Box>
	)
}
