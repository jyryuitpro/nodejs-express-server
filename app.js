const express = require('express');
const path = require('path');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use((req, res, next) => {
    console.log('모든 요청에 실행하고 싶어요');
    next();
});

app.get('/', (req, res) => {
    // res.sendFile('./index.html');
    // C:\Users\jyryu\WebstormProjects\nodejs-express-server
    console.log(__dirname);
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', (req, res) => {
    res.send('hello express');
});

app.get('/category/Javascript', (req, res) => {
    // res.send(`hello ${req.params.name}`);
    res.send(`hello Javascript`);
});

// 와일드 카드는 다른 미들웨어보다 아래에 위치해야한다
app.get('/category/:name', (req, res) => {
    // res.send(`hello ${req.params.name}`);
    res.send(`hello wildcard`);
});

app.get('/about', (req, res) => {
    res.send('hello express');
});

// 범위가 넓은 라우터들은 다른 미들웨어보다 아래에 위치해야한다
app.get('*', (req, res) => {
    res.send('hello everybody');
});

app.listen(app.get('port'), () => {
    console.log('익스프레스 서버 실행');
});