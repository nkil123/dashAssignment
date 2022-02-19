const express = require ('express');
const cors = require ('cors');
const app = express ();

app.use (express.json ());
app.use (cors ());
const authController = require ('./controllers/auth.controller');
const studentController = require ('./controllers/student.controller');
const testController = require ('./controllers/test.controller');
app.use ('/', authController);
app.use ('/', studentController);
app.use ('/', testController);

module.exports = app;
