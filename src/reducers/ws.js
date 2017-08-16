import * as socketActions from '../actions/ws.js';

const initialState = {
  connected: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case socketActions.SOCKETS_CONNECTING:
      return Object.assign({}, state, {
        connected: true,
      });
    case socketActions.SOCKETS_DISCONNECTING:
      return Object.assign({}, state, {
        connected: false,
      });
    default:
      return state;
  }
}
