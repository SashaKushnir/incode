import { RootState } from '../../store'

export const drawerOpenedSelector = (state: RootState) =>
	state.historyDrawer.drawerOpened
