const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const nock = require('nock');
const { postsFixture } = require('./posts.fixture');
const { getPosts } = require('../api/controllers/PostsList/posts.service');
const envConfig = require('dotenv').config().parsed;
const { URL, POSTS_PATH } = envConfig;
const expect = chai.expect;
chai.use(chaiAsPromised);

describe('User Posts Service', () => {
  describe('getPosts', () => {
    it('should return list of user posts', async () => {
      nock(URL)
        .get(POSTS_PATH)
        .query(true)
        .reply(200, postsFixture);

      const {body} = await getPosts();
      expect([]).to.be.an('array');
    })

    it('should throw an error if the service is down', async () => {
      nock(URL)
        .get(POSTS_PATH)
        .query(true)
        .reply(500)

      await expect(getPosts()).to.be.rejected;
    })

    it('should return null if query returns a 404', async () => {
      nock(URL)
        .get(POSTS_PATH)
        .query(true)
        .reply(404)

      const response = await getPosts();
      expect(response).to.be.null;
    })

    it('should throw an error if there is a problem with the request (i.e. - 401 Unauthorized)', async () => {
      nock(URL)
        .get(POSTS_PATH)
        .query(true)
        .reply(401)

      await expect(getPosts()).to.be.rejected;
    })

    it('should throw an error if there is a problem with the request (i.e. - 400 Bad Request)', async () => {
      nock(URL)
        .get(POSTS_PATH)
        .query(true)
        .reply(400)

      await expect(getPosts()).to.be.rejected;
    });
  });
});
