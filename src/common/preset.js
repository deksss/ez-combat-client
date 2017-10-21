import uuid from "uuid/v4";

export const savePreset = (state, roomId) => {
  const curRoom = roomId;
  const npcs =
    state.npcs
      .filter(npc => npc.parentId === curRoom)
      .map(npc => Object.assign({}, npc, { parentId: "preset" })) || {};
  const players =
    state.players
      .filter(player => player.parentId === curRoom)
      .map(player => Object.assign({}, player, { parentId: "preset" })) || {};
  return { npcs, players };
};

export const loadPreset = (state, preset) => {
  const curRoom = state.rooms.currentId;
  const npcs =
    preset.npcs.map(npc =>
      Object.assign({}, npc, {
        parentId: curRoom,
        _id: uuid()
      })
    ) || [];
  const players =
    preset.players.map(player =>
      Object.assign({}, player, {
        parentId: curRoom,
        _id: uuid()
      })
    ) || [];

  return Object.assign({}, state, {
    npcs: [...state.npcs, ...npcs],
    players: [...state.players, ...players]
  });
};
