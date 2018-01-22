import { createSelector } from 'reselect';

const selectRoute = (state) => state.get('route');

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);

const selectAppDomain = (state) => state.get('app');

const makeSelectConnected = () => createSelector(
  selectAppDomain,
  (appState) => appState.get('isConnected')
);

const makeSelectLoading = () => createSelector(
  selectAppDomain,
  (appState) => appState.get('isLoading')
);

const makeSelectServers = () => createSelector(
  selectAppDomain,
  (appState) => appState.get('servers')
);

const selectServerSlug = () => (state, ownProps) => 'bungeecord';

const makeSelectServer = () => createSelector(
  makeSelectServers(),
  selectServerSlug(),
  (servers, slug) => servers ? servers.get(slug) : null
);

const makeSelectConsole = () => createSelector(
  makeSelectServer(),
  (server) => server ? server.get('console') : null
);


const makeSelectApp = () => createSelector(
  selectAppDomain,
  (substate) => substate.toJS()
);

export default makeSelectApp;
export {
  makeSelectLocation,
  makeSelectConnected,
  makeSelectApp,
  makeSelectLoading,
  makeSelectServers,
  makeSelectBungee,
  makeSelectServer,
  makeSelectConsole,
};
