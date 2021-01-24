const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(cookieParser('jyryuitpropassword'));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'jyryuitpropassword',
    cookie: {
        httpOnly: true,
    },
    name: 'connect.sid',
}));
// app.use('/', express.static(path.join(__dirname, 'public-3030')));
app.use('/', (req, res, next) => {
    if (req.session.id) {
        express.static(path.join(__dirname, 'public-3030'))(req, res, next)
    } else {
        next();
    }
});
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // true면 qs, false면 querystring

app.use((req, res, next) => {
    req.session.data = 'jy.ryu.itpro비번'
    req.data = 'jy.ryu.itpro비번'
});

app.get('/', (req, res, next) => {
    req.session.data
    req.data
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', (req, res) => {
    res.send('hello express!');
});

app.get('/category/Javascript', (req, res) => {
    res.send(`hello Javascript`);
});

app.get('/category/:name', (req, res) => {
    res.send(`hello wildcard`);
});

app.get('/about', (req, res) => {
    res.send('hello express');
});

app.use((req, res, next) => {
    res.status(404).send('404지롱');
});

app.use((err, req, res, next) => {
    console.log(err);
    res.send('에러났지롱, 근데 안알려주지롱');
});

app.listen(app.get('port'), () => {
    console.log('익스프레스 서버 실행');
});