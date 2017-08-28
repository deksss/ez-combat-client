export const TEMPATES_TOGGLE = 'TEMPATES_TOGGLE'
export const JUNK_UPDATE = 'JUNK_UPDATE'


export const templatesToggle = () => ({
  type: TEMPATES_TOGGLE
})

export const junkUpdate = (data) => ({
  type: JUNK_UPDATE,
  data: data
})
