const CRUD = require('./lib/crud');
const express = require('express');
const jwt = require('jsonwebtoken');
const crud = new CRUD();
const bodyParser = require('body-parser');
const app = express();
const port = (process.env.PORT || process.env.APP_PORT || 3000);
const BaseModel = require('./models/base.model');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "PUT,POST,DELETE");
    next();
});

/**
 * Path authenticate: authenticate the user
 * Check if values correspond to .env fields
 */
app.post('/authenticate', function(req, res) {
	crud.authenticate(req.body, res);
});

/* Get the path for models */
var normalizedPath = require('path').join(__dirname, 'models');
var models = [];
/* For each model, require the file and construct the model */
require('fs').readdirSync(normalizedPath).forEach( function (file) {
  if (file == 'base.model.js') {
  	return;
  }
  var Model = require('./models/' + file);
  let model = new Model(app, crud);
  models.push(model);
});

/**
 * Path free: using query without filter directly
 * require: object.query
 */
/* app.post('/free', function(req, res) {
	verifyAuth(req, res, function(req, res) {
		crud.free(req.body, res);
	});
}); */

/**
 * Launch server
 */
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
