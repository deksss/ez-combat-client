export const SOCKETS_CONNECTING = 'SOCKETS_CONNECTING'
export const SOCKETS_CONNECT = 'SOCKETS_CONNECT'
export const SOCKETS_DISCONNECTING = 'SOCKETS_DISCONNECTING'
export const SOCKETS_DISCONNECT = 'SOCKETS_DISCONNECT'
export const SOCKETS_MESSAGE_SENDING = 'SOCKETS_MESSAGE_SENDING'
export const SOCKETS_MESSAGE_SEND = 'SOCKETS_MESSAGE_SEND'
export const SOCKETS_MESSAGE_RECEIVING = 'SOCKETS_MESSAGE_RECEIVING'
export const SOCKETS_MESSAGE_RECEIVE = 'SOCKETS_MESSAGE_RECEIVE'
export const JOIN_ROOM = 'JOIN_ROOM'
export const SOCKETS_JUNK_SEND = 'SOCKETS_JUNK_SEND'


export function socketsConnecting() {
  return {type: SOCKETS_CONNECTING};
}
export function socketsConnect() {
  return {type: SOCKETS_CONNECT};
}
export function socketsDisconnecting() {
  return {type: SOCKETS_DISCONNECTING};
}
export function socketsDisconnect() {
  return {type: SOCKETS_DISCONNECT};
}


export function joinRoom(options = {}) {
  return {
    type: JOIN_ROOM,
    owner_code: options.owner_code,
    _id: options._id,
    name: options.name
  }
}

export function junkSend() {
  return {
    type: SOCKETS_JUNK_SEND,
  }
}
