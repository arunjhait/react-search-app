import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

import Skeletons from '../components/Skeletons';

const Header = lazy(() => import('../containers/Header'));
const Search = lazy(() => import('../containers/Search'));

function MainRoutes() {
  return (
    <Suspense fallback={<Skeletons />}>
      <Header />
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Search} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  )
}

export default MainRoutes;