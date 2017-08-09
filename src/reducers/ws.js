import * as socketActions from '../actions/ws.js';

const initialState = {
  loaded: false,
  message: 'Just created',
  connected: false,
  history: [],
  message_history: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case socketActions.SOCKETS_CONNECTING:
      return Object.assign({}, state, {
        loaded: true,
        message: 'Connecting...',
        connected: true,
        history: [
          ...state.history,
          {
            loaded: true,
            message: 'Connecting...',
            connected: true
          }
        ]
      });
    case socketActions.SOCKETS_DISCONNECTING:
      return Object.assign({}, state, {
        loaded: true,
        message: 'Disconnecting...',
        connected: false,
        history: [
          ...state.history,
          {
            loaded: true,
            message: 'Disconnecting...',
            connected: false
          }
        ]
      });
    case socketActions.SOCKETS_MESSAGE_SENDING:
      return Object.assign({}, state, {
        loaded: true,
        message: 'Send message',
        connected: true,
        message_history: [
          ...state.message_history,
          {
            direction: '->',
            message: action.message_send
          }
        ]
      });
    case socketActions.SOCKETS_MESSAGE_RECEIVING:
      return Object.assign({}, state, {
        loaded: true,
        message: 'Message receive',
        connected: true,
        message_history: [
          ...state.message_history,
          {
            direction: '<-',
            message: action.message_receive
          }
        ]
      });
    default:
      return state;
  }
}
