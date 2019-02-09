const CRUD = require('./lib/crud');
const express = require('express');
const jwt = require('jsonwebtoken');
const crud = new CRUD();
const bodyParser = require('body-parser');
const app = express();
const port = (process.env.PORT || process.env.APP_PORT || 3000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function verifyAuth(req, res, callback) {
	if (process.env.APP_USE_AUTH == 1) {
		var token = req.headers['token'];
		if (!token) {
			res.status(401).send({ auth: false, message: 'No token provided.' });
		} else {
			jwt.verify(token, process.env.APP_AUTH_SECRET, function(err, decoded) {
			    if (err) {
			    	res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
			    } else {
			    	callback(req, res);
			    }
			});
		}
	} else {
		callback(req, res);
	}
}

/**
 * Path authenticate: authenticate the user
 * Check if values correspond to .env fields
 */
app.post('/authenticate', function(req, res) {
	crud.authenticate(req.body, res);
});

/**
 * Path add: add new object in object.table
 * filters: object.fields, object.values
 */
app.post('/add', function(req, res) {
	verifyAuth(req, res, function(req, res) {
		crud.create(req.body, res);
	});
});

/**
 * Path get: get object.table elements
 * filters: object.fields, object.where, object.order, object.group
 */
app.post('/', function(req, res) {
	verifyAuth(req, res, function(req, res) {
		crud.read(req.body, res);
	});
});

/**
 * Path update: update object.table elements
 * filters: object.fields, object.values, object.where
 */
app.put('/', function(req, res) {
	verifyAuth(req, res, function(req, res) {
		crud.update(req.body, res);
	});
});

/**
 * Path delete: delete object.table elements
 * filters: object.where
 */
app.put('/delete', function(req, res) {
	verifyAuth(req, res, function(req, res) {
		crud.delete(req.body, res)
	});
});

/**
 * Path free: using query without filter directly
 * require: object.query
 */
app.post('/free', function(req, res) {
	verifyAuth(req, res, function(req, res) {
		crud.free(req.body, res);
	});
});

/**
 * Launch server
 */
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});