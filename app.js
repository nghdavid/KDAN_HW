require('dotenv').config();
const morganBody = require('morgan-body');
const { API_VERSION, PORT } = process.env;
const attendanceRoute = require('./route/attendance-route');
const punchRoute = require('./route/punch-route');

// Express Initialization
const express = require('express');
const app = express();

app.set('trust proxy', true);
app.set('json spaces', 2);

app.use(express.static('public'));
app.use(express.json());
morganBody(app, { logResponseBody: false });

// API routes
app.use('/api/' + API_VERSION, [punchRoute, attendanceRoute]);

// Page not found
app.use(function (req, res, next) {
  res.status(404).redirect('/404.html');
});

// Error handling
app.use((err, req, res, next) => {
  const status = 500;
  console.error(err);
  res.status(status).json({ error: 'Internal Server Error' });
});

app.listen(PORT, async () => {
  console.log(`Server is listening on port: ${PORT}`);
});
module.exports = app;
