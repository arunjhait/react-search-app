const axios = require('axios');
const envConfig = require('dotenv').config().parsed;

async function getPosts() {
    const { URL, POSTS_PATH } = envConfig;
    let response = {};
    try {
        const postsList = await axios.get(`${URL}${POSTS_PATH}`);
        response = postsList.data;
    } catch (error) {
        response = error.response.status;
    }
    if (response === 404) return null;
    if (response === 500) throw new Error('Service down');
    if (response >= 400) throw new Error('Problem with request');
    else return response;
}

module.exports = {
    getPosts
}