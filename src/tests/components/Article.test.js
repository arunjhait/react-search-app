import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Articles from '../../components/Articles';
import mainArticles from '../../config/mocks/mainArticles';

describe('<Articles />', () => {
  let mockFn, comp, onSave;

  beforeEach(() => {
    mockFn = jest.fn();
    onSave = jest.fn();
    comp = render(
      <Articles {...mainArticles[0]} onSave={onSave} />
    );
  });
  it("<Articles /> should render successfully", () => {
    expect(comp.container).toBeTruthy();
  });

  it("Should appear the form", async () => {
    
    const { findByTestId } = comp;
    const val = "test value";
    const editBtn = await findByTestId('art-edit-btn');

    fireEvent.click(editBtn);
    
    const saveBtn = await findByTestId('art-save-btn');

    expect(saveBtn).toBeTruthy();
   
    const body = await findByTestId('article-body');
    const title = await findByTestId('article-title');

    fireEvent.change(title, {
      target: { value: val },
    });

    fireEvent.change(body, {
      target: { value: val },
    });

    fireEvent.click(saveBtn);

    const newEditBtn = await findByTestId('art-edit-btn');
    expect(newEditBtn).toBeTruthy();
    
  });
});