import { createSlice } from "@reduxjs/toolkit"
export const showHideSettingSlice = createSlice({
	name: "settingStatus",
	initialState: false,
	reducers: {
		showSetting: () => true,
		hideSetting: () => false,
	},
})

export const { showSetting, hideSetting } = showHideSettingSlice.actions
export default showHideSettingSlice.reducer
