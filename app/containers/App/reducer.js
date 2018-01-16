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
  SERVER_MONITORING
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
    case REQUEST:
      switch(action.requestType) {
        case 'REQUEST_SERVERS_LIST':
          return state
            .setIn(['isLoading'], true)
            .setIn(['servers'], {});
        case 'REQUEST_SERVER_DETAIL':
          return state
            .setIn(['servers', action.value.slug, 'isLoading'], true);
        default:
          return state;
      };
    case SERVERS_LIST:
      let servers = {};
      action.value.servers.forEach((slug) => {
        servers[slug] = {slug: slug};
      });
      return state
        .setIn(['isLoading'], false)
        .setIn(['bungeecord'], fromJS({slug: action.value.bungeecord}))
        .setIn(['servers'], fromJS(servers));
    case SERVER_BASE_DETAIL:
      if (action.value.slug == state.getIn(['bungeecord', 'slug']))  {
        return state
          .setIn(['bungeecord'], fromJS(action.value))
          .setIn(['bungeecord', 'isLoading'], false);
      } else {
        return state
          .setIn(['servers', action.value.slug], fromJS(action.value))
          .setIn(['servers', action.value.slug, 'isLoading'], false);
      }
    case SERVER_ACTIVE:
      if (action.value.slug == state.getIn(['bungeecord', 'slug']))  {
        return state
          .setIn(['bungeecord', 'isActive'], action.value.isActive);
      } else {
        return state
          .setIn(['servers', action.value.slug, 'isActive'], action.value.isActive);
      }
    case SERVER_RUNNING:
      if (action.value.slug == state.getIn(['bungeecord', 'slug']))  {
        return state
          .setIn(['bungeecord', 'running'], action.value.running);
      } else {
        return state
          .setIn(['servers', action.value.slug, 'running'], action.value.running);
      }
    case SERVER_MONITORING:
      if (action.value.slug == state.getIn(['bungeecord', 'slug']))  {
        return state
          .setIn(['bungeecord', 'monitoring'], action.value.monitoring);
      } else {
        return state
          .setIn(['servers', action.value.slug, 'monitoring'], action.value.monitoring);
      }
    default:
      return state;
  }
}

export default appReducer;
