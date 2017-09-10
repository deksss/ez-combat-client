export const TEMPATES_TOGGLE = 'TEMPATES_TOGGLE'
export const JUNK_UPDATE = "JUNK_UPDATE";
export const SET_USER_ID = "SET_USER_ID";


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
