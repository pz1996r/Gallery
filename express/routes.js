// const dotenv = require('dotenv');
// dotenv.config();
// const cors = require('cors');
const serverless = require('serverless-http');
const express = require('express');
const app = express();
const router = express.Router();
exports.router = router;

// routy:
require('./routes/api1');
require('./routes/clash');

app.use(express.json());
// app.use(cors());

app.use('/.netlify/functions/routes', (router));
module.exports.handler = serverless(app);
