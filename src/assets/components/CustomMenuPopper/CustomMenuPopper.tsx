import { Grow, Paper, Popper } from '@mui/material'
import React, { FC, MutableRefObject, PropsWithChildren } from 'react'

interface CustomMenuPopperProps extends PropsWithChildren {
	anchorRef: MutableRefObject<null>
	open: boolean
}

export const CustomMenuPopper: FC<CustomMenuPopperProps> = ({
	anchorRef,
	children,
	open
}) => {
	return (
		<Popper
			open={open}
			sx={{
				zIndex: 10,
				top: '1px!important',
				width: '215px'
			}}
			anchorEl={anchorRef.current}
			role={undefined}
			placement='bottom-start'
			transition
			disablePortal
		>
			{({ TransitionProps, placement }) => (
				<Grow
					{...TransitionProps}
					style={{
						transformOrigin:
							placement === 'bottom-start' ? 'left top' : 'left bottom',
						borderTopLeftRadius: 0,
						borderTopRightRadius: 0
					}}
				>
					<Paper>{children}</Paper>
				</Grow>
			)}
		</Popper>
	)
}
