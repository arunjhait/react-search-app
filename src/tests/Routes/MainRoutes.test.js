import React, { Suspense } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import { render } from "@testing-library/react";

import Skeletons from '../../components/Skeletons';
import Header from '../../containers/Header';
import Search from '../../containers/Search';
import TestProvider from '../../config/TestProvider';
describe("MainRoutes component test suite", () => {

  it('MainRoutes should render successfully', () => {
    const comp = render(
      <TestProvider>
        <Suspense fallback={<Skeletons />}>
          <Header />
          <BrowserRouter>
            <Switch>
              <Route exact path='/' component={Search} />
            </Switch>
          </BrowserRouter>
        </Suspense>
      </TestProvider>
    );
    expect(comp.container).toBeTruthy();
  });
});
