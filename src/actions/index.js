export const TEMPATES_TOGGLE = 'TEMPATES_TOGGLE'
export const JUNK_UPDATE = "JUNK_UPDATE";
export const SET_USER_ID = "SET_USER_ID";
export const SETTINGS_TOGGLE = "SETTINGS_TOGGLE";
export const SAVE_STORE_TO_FILE = "SAVE_STORE_TO_FILE";
export const LOAD_STORE_FROM_JSON = "LOAD_STORE_FROM_JSON";


export const templatesToggle = () => ({
  type: TEMPATES_TOGGLE
})

export const junkUpdate = (data) => ({
  type: JUNK_UPDATE,
  data: data
})

export const setUserId = (userId) => ({
  type: SET_USER_ID,
  userId: userId
})

export const settingsToggle = () => ({
  type: SETTINGS_TOGGLE,
})

export const saveStoreToFile = () => ({
  type: SAVE_STORE_TO_FILE,
})

export const loadStoreFromJson = (data) => ({
  type: LOAD_STORE_FROM_JSON,
  data: data
})
