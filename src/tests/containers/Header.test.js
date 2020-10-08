import React from 'react';
import { render } from '@testing-library/react';
import Header from '../../containers/Header';
import TestProvider from '../../config/TestProvider';

describe('<Header />', () => {
  it('Renders successfully without error', () => {
    const header = render(
      <TestProvider>
        <Header />
      </TestProvider>
    );
    expect(header.container).toBeTruthy();
  });
});