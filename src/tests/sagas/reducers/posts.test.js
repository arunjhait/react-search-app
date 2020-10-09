import { fetchPostsSaga } from '../../../store/sagas/posts';
import articles from '../../../config/mocks/articles';

describe('posts sevice', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => jest.spyOn(window, 'fetch'));

  // it('should fetch posts', async () => {
  //   const requestArticles = jest
  //     .spyOn(window, 'fetch')
  //     .mockImplementation(() => ({
  //       json: async () => Promise.resolve({ data: articles })
  //     }));

  //   const res = await fetchPostsSaga();
  //   expect(requestArticles).toHaveBeenCalledTimes(1);
  //   expect(res).toEqual(articles);
  // });

  it('should call api and return error', async () => {
    const mockError = 'Not found';   
    const requestArticles = jest
      .spyOn(window, 'fetch')
      .mockImplementation(() => Promise.reject({ message: mockError }));

    try {
      await fetchPostsSaga();
    } catch (e) {      
      expect(requestArticles).toHaveBeenCalledTimes(1);     
      expect(e.message).toBe(mockError);
    }
  });
});
