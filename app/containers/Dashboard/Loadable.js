/**
 *
 * Asynchronously loads the component for Dashboard
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
