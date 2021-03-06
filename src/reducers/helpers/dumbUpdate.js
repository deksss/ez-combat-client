const dumbUpdate = (state, action) => {
  const remoteNpcs = action.data.npcs;
  const remotePlayers = action.data.players;
  const npcsNew =
    remoteNpcs &&
    remoteNpcs.filter(rnpc => !state.npcs.find(npc => npc._id === rnpc._id));
  const playersNew =
    remotePlayers &&
    remotePlayers.filter(
      rplayer => !state.players.find(player => player._id === rplayer._id)
    );

  return Object.assign({}, state, {
    npcs: [
      ...[...state.npcs]
        .map(npc => {
          if (npc.parantId === action.room) {
            return (
              (remoteNpcs && remoteNpcs.find(rnpc => rnpc._id === npc._id)) ||
              false
            );
          }
          return npc;
        })
        .filter(npc => npc !== false),
      ...npcsNew
    ],
    players: [
      ...[...state.players]
        .map(player => {
          if (player.parantId === action.room) {
            return (
              (remotePlayers &&
                remotePlayers.find(rplayer => rplayer._id === player._id)) ||
              false
            );
          }
          return player;
        })
        .filter(player => player !== false),
      ...playersNew
    ],
    rolls: action.data.rolls
  });
};

export default dumbUpdate;
