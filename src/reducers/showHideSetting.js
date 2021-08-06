export const showHideSettingReducer = (state = false, action) => {
	switch (action.type) {
		case "SHOW_SETTING": {
			return true
		}
		case "HIDE_SETTING": {
			return false
		}
		default: {
			return state
		}
	}
}
