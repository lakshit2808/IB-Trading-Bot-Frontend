const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const Router = require('./Router');

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

const db = mysql.createConnection({
    host: 'sql6.freesqldatabase.com',
    user: 'sql6491166',
    password: '8giSPtIWYA',
    database: 'sql6491166'
});

db.connect(function(err) {
    if (err) {
        console.log('DB Error');
        throw err;
    }});

const sessionStore = new MySQLStore({
    expiration: (1825 * 86400 * 1000),
    endConnectionOnClose: false}, db); 
    
app.use(session({
    key: 'fsfjkj423432',
    secret: '76dfgd2341',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (1825 * 86400 * 1000),
        httpOnly: false
    }
}));   

new Router(app, db);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname,'build', 'index.html'));
}
);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server started on port 3000');
});
