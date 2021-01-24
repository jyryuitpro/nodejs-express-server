const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const app = express();

app.set('port', process.env.PORT || 3000);

// 개발
app.use(morgan('dev'));
// 배포
// app.use(morgan('combined'));

app.use(cookieParser('jyryuitpropassword'));

// 클라이언트의 json 데이터
app.use(express.json());
// 클라이언트의 form 데이터 | 이미지, 파일의 경우는 urlencoded가 처리를 못해서 multer를 사용한다.
app.use(express.urlencoded({ extended: true })); // true면 qs, false면 querystring

app.use(bodyParser.raw()); // 바이너리 데이터
app.use(bodyParser.text()); // 문자열 데이터

app.get('/', (req, res, next) => {
    req.body
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', (req, res) => {
    res.send('hello express!');
});

app.get('/category/Javascript', (req, res) => {
    res.send(`hello Javascript`);
});

// 와일드 카드는 다른 미들웨어보다 아래에 위치해야한다
app.get('/category/:name', (req, res) => {
    res.send(`hello wildcard`);
});

app.get('/about', (req, res) => {
    res.send('hello express');
});

// 404처리 미들웨어
// 404 커스텀마이징 : 라우터들 보다는 아래, 에러처리보다는 위에 위치시킨다.
app.use((req, res, next) => {
    res.status(404).send('404지롱');
});

// 3) 에러 미들웨어 : 반드시 매개변수 4개가 꼭 다 들어있어야 된다.
app.use((err, req, res, next) => {
    console.log(err);
    res.send('에러났지롱, 근데 안알려주지롱');
});

app.listen(app.get('port'), () => {
    console.log('익스프레스 서버 실행');
});