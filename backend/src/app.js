const express = require('express');
const routes = require('./routes/pokemonRoutes');
const app = express();
const port = 3000;

app.use(express.json());

app.use('/api', routes);

module.exports = app;