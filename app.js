
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const multer = require('multer');
const app = express();
const port = 5000;
const fileUpload = require('express-fileupload');
const session = require('express-session');
const {createAccount, logout, login} = require('./src/router/admin');
const {register, signin} = require('./src/router/user');
const {createShow, viewGenres, viewMySubscription, viewActors,unsubscribeSubscription,viewRatings, viewComments, viewShows, viewSubscription, editShow, deleteShow, addActorsToShow, commentAShow, createActors, createGenre, rateAshow, subscribeToAShow } = require('./src/router/shows');
const MySQLStore = require('express-mysql-session')(session);
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Password2015Mysql.com',
    database: 'tv_show'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

global.db = db;
global.session = session;
global.multer = multer;
let sessionStore = new MySQLStore({}/* session store options */, db);
app.set('port', process.env.port || port);

let cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: true
}));
app.use(fileUpload);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8081");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/user_registration', register);
app.post('/user_signin', signin);
app.post('/login', login);
app.post('/register', createAccount);
app.post('/create_a_show', createShow);
app.put('/edit_a_show', editShow);
app.delete('/delete_a_show/:id', deleteShow);
app.post('/add_actor_to_a_show/:id', addActorsToShow); //c
app.post('/rate_a_show', rateAshow); //c
app.post('/comment_a_show', commentAShow); //c
app.post('/create_a_genre', createGenre); //c
app.post('/create_an_actor', createActors);  //c
app.post('/subscribe_to_a_show/:id', subscribeToAShow); //c
app.get('/logout', logout);
app.get('/shows', viewShows); //c//c
app.get('/actors/:show_id', viewActors);
app.get('/genres', viewGenres);
app.get('/comments/:show_id', viewComments);
app.get('/rating/:show_id', viewRatings);
app.get('/show_subscriptions', viewSubscription); //c
app.get('/view_my_subscriptions', viewMySubscription); //c
app.delete('/unsubscribe/:id', unsubscribeSubscription); //c
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});




