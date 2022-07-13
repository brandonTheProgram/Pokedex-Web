const express = require('express');
const expressLayouts = require('express-ejs-layouts');
require("dotenv").config();
const routes = require('./server/routes/pokemonRoutes.js');

const app = express();
const PORT = 3500;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(expressLayouts);
app.use('/', routes);

app.set('layout', './layouts/main');
app.set("view engine", "ejs");

app.listen(PORT, ()=> console.log(`Listening to port ${PORT}`));