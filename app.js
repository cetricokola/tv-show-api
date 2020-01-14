
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
const port = 5000;
const {createAccount, login} = require('./src/router/admin');
const {register, signin} = require('./src/router/users');
const {createShow, viewActors,unsubscribeSubscription,viewRatings, viewComments, viewShows, viewSubscription, editShow, deleteShow, addActorsToShow, commentAShow, createActors, createGenre, rateAshow, subscribeToAShow } = require('./src/router/tv_show');

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
app.set('port', process.env.port || port);
app.set('views', __dirname + '/src/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/user_registration', register);
app.post('/user_signin', signin);
app.post('/login', login);
app.post('/register', createAccount);

app.post('/create_a_show', createShow); //c
app.put('/edit_a_show', editShow);
app.delete('/delete_a_show', deleteShow);
app.post('/add_actor_to_a_show', addActorsToShow); //c
app.post('/rate_a_show', rateAshow); //c
app.post('/comment_a_show', commentAShow); //c
app.post('/create_a_genre', createGenre); //c
app.post('/create_an_actor', createActors);  //c
app.post('/subscribe_to_a_show', subscribeToAShow); //c

app.get('/shows', viewShows); //c//c
app.get('/actors', viewActors);
app.get('/comments/:show_id', viewComments);
app.get('/rating/:show_id', viewRatings);
app.get('/show_subscriptions', viewSubscription); //c
app.delete('/unsubscribe/:show_id', unsubscribeSubscription); //c

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});




