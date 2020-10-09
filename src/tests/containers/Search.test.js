import React from 'react';
import { fireEvent, render, screen, waitFor  } from '@testing-library/react';
import Search from '../../containers/Search';
import TestProvider from '../../config/TestProvider';
import articles from '../../config/mocks/articles';

describe('<Search />', () => {

  let comp, filterResults, pagination, totalItems, setPaginationFilters, posts, mockFn;

  beforeEach(() => {
    filterResults = { articles, matching: null }
    mockFn = jest.fn();
    posts = articles;
    pagination = {
      pageNumber: 1,
      itemsPerPage: 10,
      total: 100,
    };
    setPaginationFilters = jest.fn();
    totalItems = 100;
    comp = render(
      <TestProvider>
        <Search />
      </TestProvider>
    );
  });

  it('Renders successfully without error', () => {
    const search = render(
      <TestProvider>
        <Search />
      </TestProvider>
    );
    expect(search.container).toBeTruthy();
  });
});
