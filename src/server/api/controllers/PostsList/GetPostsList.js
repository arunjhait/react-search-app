const { getPosts } = require('./posts.service');

async function getPostsList(req, res) {
    try {
        const users = await getPosts();
        return res.json({ status: true, code: 200, message: 'Users Found', data:users});
    } catch (error) {
        return res.json({ status: false, code: 404, message: 'Record Not Found', data: []})
    }
}

module.exports = getPostsList;