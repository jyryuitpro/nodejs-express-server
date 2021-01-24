const express = require('express');
const path = require('path');
const app = express();

app.set('port', process.env.PORT || 3000);

// 1) 공통 미들웨어
app.use((req, res, next) => {
    console.log('모든 요청에 실행하고 싶어요');
    next();
});

// app.use((req, res, next) => {
//     console.log('1 요청에 실행하고 싶어요');
//     next();
// }, (req, res, next) => {
//     throw new Error('에러가 났어요');
// });

// app.use('/about', (req, res, next) => {
//     console.log('모든 요청에 실행하고 싶어요');
//     next();
// });

// 2) 라우터
app.get('/', (req, res) => {
    // res.sendFile('./index.html');
    // C:\Users\jyryu\WebstormProjects\nodejs-express-server
    // console.log(__dirname);
    // 요청 한 번에 응답도 한번!
    // Cannot set headers after they are sent to the client
    // res.sendFile(path.join(__dirname, 'index.html'));
    // res.send('안녕하세요.'); // writeHead, end
    // res.json({hello: 'jyryuitpro'});

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('안녕하세요.');
});

app.post('/', (req, res) => {
    res.send('hello express!');
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
// app.get('*', (req, res) => {
//     res.send('hello everybody');
// });

// 404처리 미들웨어
// 404 커스텀마이징 : 라우터들 보다는 아래, 에러처리보다는 위에 위치시킨다.
app.use((req, res, next) => {
    // res.send('404지롱');
    // status 200이 생략되어있다.
    res.status(200).send('404지롱');
});

// 3) 에러 미들웨어 : 반드시 매개변수 4개가 꼭 다 들어있어야 된다.
app.use((err, req, res, next) => {
    console.log(err);
    res.send('에러났지롱, 근데 안알려주지롱');
});

app.listen(app.get('port'), () => {
    console.log('익스프레스 서버 실행');
});