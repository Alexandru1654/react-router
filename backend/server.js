const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());

const posts = [
    { id: 1, title: 'Post 1', content: 'Content of post 1' },
    { id: 2, title: 'Post 2', content: 'Content of post 2' },
];

app.get('/api/posts', (req, res) => {
    res.json(posts);
});

app.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${port}`);
});




