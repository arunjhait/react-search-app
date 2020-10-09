import { fetchPostsSaga } from '../../store/sagas/posts';
import fetchPostsMockData from '../../config/mocks/fetchPostsMockData';

describe('posts sevice', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => jest.spyOn(window, 'fetch'));

  it('should call api and return error', async () => {
    const mockError = 'api is not defined';   
    const requestPosts = jest
      .spyOn(window, 'fetch')
      .mockImplementation(() => Promise.reject({ message: mockError }));

    try {
      await api.fetchPostsSaga();
    } catch (e) {
      expect(e.message).toBe(mockError);
    }
  });
});
