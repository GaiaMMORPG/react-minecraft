/*
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import {
  START_WEBSOCKET,
  STOP_WEBSOCKET,
  SOCKET_OPENED,
  REQUEST,
  SERVERS_LIST,
  SERVER_BASE_DETAIL,
  SERVER_ACTIVE,
  SERVER_RUNNING,
  SERVER_MONITORING,
  SERVER_BACKUP,
  SERVER_PLAYER_LOGIN,
  SERVER_PLAYER_LOGOUT,
  SERVER_CONSOLE,
  SERVER_CONSOLE_LINE
} from './constants';

// The initial state of the App
const initialState = fromJS({
  isLoading: true,
  servers: {}
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SOCKET_OPENED:
      return state.set('isConnected', true);
    case STOP_WEBSOCKET:
      return state.set('isConnected', false);
    case SERVERS_LIST:
      let servers = {};
      action.value.servers.forEach((slug) => {
        servers[slug] = {slug: slug};
      });
      return state
        .setIn(['isLoading'], false)
        .setIn(['servers'], fromJS(servers));
    case SERVER_BASE_DETAIL:
      return state
        .updateIn(['servers', action.value.slug], (oldMap) => {
          return oldMap.merge(fromJS(action.value));
        })
    case SERVER_ACTIVE:
      return state
        .setIn(['servers', action.value.slug, 'isActive'], action.value.isActive);
    case SERVER_RUNNING:
      let newState = state;
      if (action.value.running == 'STOPPED') {
        newState = newState.deleteIn(['servers', action.value.slug, 'monitoring']);
      }
      return newState
        .setIn(['servers', action.value.slug, 'running'], action.value.running);
    case SERVER_MONITORING:
      return state
        .setIn(['servers', action.value.slug, 'monitoring'], fromJS(action.value.monitoring));
    case SERVER_BACKUP:
      return state
        .setIn(['servers', action.value.slug, 'lastBackup'], fromJS(action.value.lastBackup));
    case SERVER_PLAYER_LOGIN:
      return state
        .setIn(['servers', action.value.slug, 'players'], state.getIn(['servers', action.value.slug, 'players']) + 1);
    case SERVER_PLAYER_LOGOUT:
      return state
        .setIn(['servers', action.value.slug, 'players'], state.getIn(['servers', action.value.slug, 'players']) - 1);
    case SERVER_CONSOLE:
      return state
        .setIn(['servers', action.value.slug, 'console'], fromJS(action.value.console))
        .setIn(['servers', action.value.slug, 'consoleLength'], action.value.length);
    case SERVER_CONSOLE_LINE:
      let console = state.getIn(['servers', action.value.slug, 'console']).push(action.value.line);
      if (console.size > state.getIn(['servers', action.value.slug, 'consoleLength'])) {
        console.shift();
      }
      return state
        .setIn(['servers', action.value.slug, 'console'], console);
    default:
      return state;
  }
}

export default appReducer;
