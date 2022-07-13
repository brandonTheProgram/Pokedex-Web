const express = require('express');
const expressLayouts = require('express-ejs-layouts');
require("dotenv").config();
const routes = require('./server/routes/pokemonRoutes.js');

const app = express();
const host = '0.0.0.0';
const port = process.env.PORT || 3500;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(expressLayouts);
app.use('/', routes);

app.set('layout', './layouts/main');
app.set("view engine", "ejs");

app.listen(port, host, ()=> console.log(`Listening to port ${port}`));