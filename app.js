const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://mati:' + 
process.env.MONGO_ATLAS_PW + 
'@cluster-8u2ux.mongodb.net/test?');

const prodctRoutes = require('./api/routes/announcements');
const searchRoutes = require('./api/routes/search');
const userRoutes = require('./api/routes/user');
const contactRoutes = require('./api/routes/contact');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({Pextended: false}));
app.use(bodyParser.json());

/*Dajemy możliwość dostepu innym "serwerom" do naszego 
CORS, "*" oznacza, że wpuszczamy wszystkich*/
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 
    'Origin, X-Request-With, Content-Type, Accept, Authorization');
    if(req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

/*use, które informują o istnieniu "zakładek" announcements
i orders, ścieżka do nich zapisana jest w zmiennych, które
przesyłane są w drugim argumencie */
app.use('/announcements', prodctRoutes);
app.use('/search', searchRoutes);
app.use('/user', userRoutes);
app.use('/contact', contactRoutes);

/*funkcja, która się wykona, jeśli żaden poprzedni use
się nie wykona, czyli nie odnajdzie porządanej ścieżki
html */
app.use((req, res, next) => {
    const error = new Error('NOT FOUND 404');
    error.status = 404;
    next(error);
});

/*funkcja, która odbierze jakikolwiek error z naszego
programu i się nim zajmie*/
app.use((error, req, res, next) => { 
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;