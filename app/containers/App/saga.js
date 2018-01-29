import { eventChannel } from 'redux-saga';
import { call, put, take, race } from 'redux-saga/effects';

function watchMessages(socket) {
  return eventChannel((emit) => {
    socket.onopen = () => {
      emit({
        type: 'SOCKET_OPENED'
      });
    };
    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      emit({
        type: msg.type,
        value: msg.value
      });
    };
    return () => {
      socket.close();
    };
  });
}

function* internalListener(socket) {
  while (true) {
    const { data } = yield take('REQUEST');
    socket.send(JSON.stringify({ type: data.requestType, value: data.value }));
  }
}

function* externalListener(socketChannel) {
  while (true) {
    const action = yield take(socketChannel);
    yield put(action);
  }
}

export default function* wsHandling() {
  while (true) {
    const data = yield take('START_WEBSOCKET');
    console.log(((window.location.protocol === "https:") ? "wss://" : "ws://") + window.location.hostname + '/ws');
    const socket = new WebSocket(((window.location.protocol === 'https:') ? 'wss://' : 'ws://') + window.location.hostname + '/ws');

    const socketChannel = yield call(watchMessages, socket);

    const { cancel } = yield race({
      task: [call(externalListener, socketChannel), call(internalListener, socket)],
      cancel: take('STOP_WEBSOCKET')
    });

    if (cancel) {
      socketChannel.close();
    }
  }
}
