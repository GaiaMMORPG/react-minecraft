/**
 *
 * Asynchronously loads the component for AdminRoute
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
