/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const DEFAULT_LOCALE = 'en';
export const START_WEBSOCKET = 'START_WEBSOCKET';
export const STOP_WEBSOCKET = 'STOP_WEBSOCKET';
export const SOCKET_OPENED = 'SOCKET_OPENED';
export const REQUEST = 'REQUEST';
export const SERVERS_LIST = 'SERVERS_LIST';
export const SERVER_BASE_DETAIL = 'SERVER_BASE_DETAIL';
export const SERVER_ACTIVE = 'SERVER_ACTIVE';
export const SERVER_RUNNING = 'SERVER_RUNNING';
export const SERVER_MONITORING = 'SERVER_MONITORING';
export const SERVER_BACKUP = 'SERVER_BACKUP';
export const SERVER_PLAYER_LOGIN = 'SERVER_PLAYER_LOGIN';
export const SERVER_PLAYER_LOGOUT = 'SERVER_PLAYER_LOGOUT';
export const SERVER_CONSOLE = 'SERVER_CONSOLE';
export const SERVER_CONSOLE_LINE = 'SERVER_CONSOLE_LINE';
