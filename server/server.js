const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());

const postListMethods = require('./api/controllers/PostsList');

app.get('/articles', postListMethods.getPostsList);
 
app.listen(port, () => console.log("Backend server live on " + port));