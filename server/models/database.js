const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

const DB = mongoose.connection;

DB.on('error', console.error.bind(console, 'An error has occurred: '));
DB.once('open', function() {
    console.log('A connection has been established');
});

// Models
require('./Attack');
require('./Game');
require('./Pokemon');
require('./Region');
require('./Weakness');
