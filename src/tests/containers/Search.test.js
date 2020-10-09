import React from 'react';
import { fireEvent, render, screen, waitFor  } from '@testing-library/react';
import Search from '../../containers/Search';
import TestProvider from '../../config/TestProvider';
import articles from '../../config/mocks/articles';

describe('<Search />', () => {

  let comp, filterResults, pagination, totalItems, setPaginationFilters;

  beforeEach(() => {
    filterResults = { articles, matching: null }
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

  it('should update pagination filters on page change', async () => {
    const paginationComp = await screen.findByTestId('pagination-comp');
        
    expect(paginationComp).toBeTruthy();
    fireEvent.change(paginationComp, {
      page: 3
    });
    waitFor(() => expect(setPaginationFilters).toHaveBeenCalledTimes(1));
  });
});
