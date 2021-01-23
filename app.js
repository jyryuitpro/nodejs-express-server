const express = require('express');

const app = express();

app.set('port', process.env.PORT || 3000);
app.get('/', (req, res) => {
    res.send('hello express');
});

app.post('/', (req, res) => {
    res.send('hello express');
});

app.get('/about', (req, res) => {
    res.send('hello express');
});

app.listen(app.get('port'), () => {
    console.log('익스프레스 서버 실행');
});