export const ROLL_D20 = 'ROLL_D20'

export const rollD20 = (data) => ({
  type: ROLL_D20,
  roll: data.roll,
  name: data.name
})
