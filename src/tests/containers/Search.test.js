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

  it('should update pagination filters on page change', async () => {
    const paginationComp = await waitFor(() => {
      screen.findByTestId('pagination-comp');
    });
    
    waitFor(() => {
      expect(paginationComp).toBeTruthy();
      fireEvent.change(paginationComp, {
        page: 3
      })
    });
      waitFor(() => expect(setPaginationFilters).toHaveBeenCalledTimes(1));
    });

    it("it should populate datalist correctly", async () => {
      const autoComplete = await waitFor(() => {
        screen.findByTestId('autocomplete-data-list');
      });
      waitFor(() => {
        expect(autoComplete).toBeTruthy();
      });
    });
});
