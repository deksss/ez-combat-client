export const ROLL_D20 = "ROLL_D20";
export const ROLL_CUSTOM = "ROLL_CUSTOM";

export const rollD20 = data => ({
  type: ROLL_D20,
  roll: data.roll,
  name: data.name,
  toServer: true,
});

export const rollCustom = data => ({
  type: ROLL_CUSTOM,
  rolls: data.rolls,
  types: data.types,
  name: data.name,
  rawString: data.rawString,
  toServer: true,
});
