const express = require('express');
const cors = require('cors');
const routes = require('./routes/pokemonRoutes');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/api', routes);

module.exports = app;
