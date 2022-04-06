require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
// cores
var cors = require('cors');
// Router Paths
const homeRoutes = require('./api/routes/homeRoutes');
const userRoutes = require('./api/routes/userRoutes');
const productRoutes = require('./api/routes/productRoute');
// morgan

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Use Cores With Options
var corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200
  }

app.use('/uploads', express.static('uploads'));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Routers
app.use('/', homeRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);

// Routers Ends

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message
    })
});

module.exports = app;
