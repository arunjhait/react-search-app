// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import fetchPostsMockData from './config/mocks/fetchPostsMockData';

jest.spyOn(global, 'fetch').mockImplementation(() =>
  Promise.resolve({
    json: () => Promise.resolve(JSON.parse(fetchPostsMockData))
  })
);

beforeEach(() => {
  global.fetch.mockClear();
});
