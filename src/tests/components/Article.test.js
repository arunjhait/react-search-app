import React from 'react';
import { render, fireEvent, waitForElement, screen } from '@testing-library/react';
import Articles from '../../components/Articles';
import Search from '../../containers/Search';
import TestProvider from '../../config/TestProvider';

describe('<Articles />', () => {
  it('Renders successfully without error', () => {
    const articles = render(
      <TestProvider>
        <Articles />
      </TestProvider>
    );
    expect(articles.container).toBeTruthy();
  });
});