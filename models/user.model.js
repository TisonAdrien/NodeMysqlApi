
const Base = require('./base.model');

module.exports = class User extends Base {

	constructor (app, crud) {
		super(app, crud);
		this.tableName = 'user';
		this.requireAuth = {
			'GET': false,
			'POST': true,
			'PUT': true,
			'DELETE': true
		};
		this.hiddenFields = [ 'password' ];
		this.init();
	}

	beforePost(req, user) {
		/* Here you can change the POST request before call */
		return req;
	}

	beforeGet(req, user) {
		/* Here you can change the GET request before call */
		return req;
	}

	beforePut(req, user) {
		/* Here you can change the PUT request before call */
		return req;
	}

	beforeDelete(req, user) {
		/* Here you can change the DELETE request before call */
		return req;
	}

	initCustom() {
		/**
		 * Path custom: do something without crud or more special
		 */
	}

}
