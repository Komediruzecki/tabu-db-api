const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // Middleware
const cors = require('cors')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors())

// Load environment variables from .env file
require('dotenv').config();

const port = process.env.PORT || 3000;
const routes = require('./routes/api');
const apiRoute = process.env.API_ROUTE || '/api';
app.use(apiRoute, routes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
