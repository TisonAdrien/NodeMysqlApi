
module.exports = class Base {

	constructor (app, crud) {
		this.tableName = this.tableName || null;
		this.requireAuth = this.requireAuth || {
			'GET': false,
			'POST': true,
			'PUT': true,
			'DELETE': true
		};
		this.hiddenFields = [];
		this.app = app;
		this.crud = crud;
	}

	init () {
		this.initPost();

		this.initGet();

		this.initPut();

		this.initDelete();

		this.initCustom();
	}

	beforePost(req, user) {
		return req;
	}

	beforeGet(req, user) {
		return req;
	}

	beforePut(req, user) {
		return req;
	}

	beforeDelete(req, user) {
		return req;
	}

	initGet() {
		/**
		 * Path get: get object.table elements
		 * filters: object.fields, object.where, object.order, object.group
		 */
		this.app.post('/' + this.tableName + '/', (function(req, res) {
			req.body.table = this.tableName;
			req.body.hiddenFields = this.hiddenFields;
			if (this.requireAuth.GET) {
				this.verifyAuth(req, res, function(req, res, user) {
					req = this.beforeGet(req, user);
					this.crud.read(req.body, res);
				});
			} else {
				req = this.beforeGet(req, null);
				this.crud.read(req.body, res);
			}
		}).bind(this));
	}

	initPost() {
		/**
		 * Path add: add new object in object.table
		 * filters: object.fields, object.values
		 */
		this.app.post('/' + this.tableName + '/add', (function(req, res) {
			req.body.table = this.tableName;
			req.body.hiddenFields = this.hiddenFields;
			if (this.requireAuth.POST) {
				this.verifyAuth(req, res, function(req, res, user) {
					req = this.beforePost(req, user);
					this.crud.create(req.body, res);
				});
			} else {
				req = this.beforePost(req, null);
				this.crud.create(req.body, res);
			}
		}).bind(this));
	}

	initPut() {
		/**
		 * Path update: update object.table elements
		 * filters: object.fields, object.values, object.where
		 */
		this.app.put('/' + this.tableName + '/', (function(req, res) {
			req.body.table = this.tableName;
			req.body.hiddenFields = this.hiddenFields;
			if (this.requireAuth.PUT) {
				this.verifyAuth(req, res, function(req, res, user) {
					req = this.beforePut(req, user);
					this.crud.update(req.body, res);
				});
			} else {
				req = this.beforePut(req, null);
				this.crud.update(req.body, res);
			}
		}).bind(this));
	}

	initDelete() {
		/**
		 * Path delete: delete object.table elements
		 * filters: object.where
		 */
		this.app.put('/' + this.tableName + '/delete', (function(req, res) {
			req.body.table = this.tableName;
			req.body.hiddenFields = this.hiddenFields;
			if (this.requireAuth.DELETE) {
				this.verifyAuth(req, res, function(req, res, user) {
					req = this.beforeDelete(req, user);
					this.crud.delete(req.body, res);
				});
			} else {
				req = this.beforeDelete(req, null);
				this.crud.delete(req.body, res);
			}
		}).bind(this));
	}

	initCustom() {
		// This function is used by other models
	}

	verifyAuth (req, res, callback) {
		if (process.env.APP_USE_AUTH == 1) {
			var token = req.headers['Authorization'];
			if (!token) {
				res.status(401).send({ auth: false, message: 'No token provided.' });
			} else {
				jwt.verify(token, process.env.APP_AUTH_SECRET, function(err, decoded) {
				    if (err) {
				    	res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
				    } else {
				    	callback(req, res, decoded);
				    }
				});
			}
		} else {
			callback(req, res);
		}
	}

}
