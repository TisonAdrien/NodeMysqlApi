const CRUD = require('./lib/crud');
const express = require('express');
const crud = new CRUD();
const bodyParser = require('body-parser');
const app = express();
const port = (process.env.PORT || process.env.APP_PORT || 3000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Path add: add new object in object.table
 * filters: object.fields, object.values
 */
app.post('/add', function(req, res) {
	crud.create(req.body, res);
});

/**
 * Path get: get object.table elements
 * filters: object.fields, object.where, object.order, object.group
 */
app.post('/', function(req, res) {
	crud.read(req.body, res);
});

/**
 * Path update: update object.table elements
 * filters: object.fields, object.values, object.where
 */
app.put('/', function(req, res) {
	crud.update(req.body, res);
});

/**
 * Path delete: delete object.table elements
 * filters: object.where
 */
app.put('/delete', function(req, res) {
	crud.delete(req.body, res);
});

/**
 * Path free: using query without filter directly
 * require: object.query
 */
app.post('/free', function(req, res) {
	crud.free(req.body, res);
});

/**
 * Launch server
 */
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});