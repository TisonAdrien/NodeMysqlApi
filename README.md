# Node MYSQL API

> Create global API provided by a NodeJS server with a MYSQL database

## Getting Started

### Prerequisites

The project is based on NodeJS then you have to install it.

* [Install NodeJS and npm][1].

### Installing

First step : Install the project and install dependencies.

```bash
# install project
git clone https://github.com/TisonAdrien/NodeMysqlApi.git

# Go to directory
cd NodeMysqlApi

# install dependencies
npm install
```

Second step : configure your database profile in .env
```bash
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=database
DB_USER=root
DB_PASSWORD=root

APP_PORT=3000

APP_USE_AUTH=1
APP_AUTH_SECRET=YOUR APP SECRET KEY
APP_AUTH_FIELDS=username
APP_AUTH_FIELDS_HASH=password
APP_AUTH_TABLE=user
APP_TOKEN_EXPIRES=86400
```

APP_USE_AUTH is to use authentication for your API, if you want to use authentication set t to 1.
APP_AUTH_SECRET is a simple key to hash the tokens
APP_AUTH_FIELDS is the fields to check when you use authentication (For example: username)
APP_AUTH_FIELDS_HASH is the fields hashed in the database with MD5() method to check when you use authentication (For example: password)
APP_AUTH_TABLE is the table where are the fields to use with authentication (Example: user)
APP_TOKEN_EXPIRES is the duration time of your token here 86400 : 24 hours

> If you don't want to use Authenticate, please set the variable APP_USE_AUTH to 0 in .env file

### Runing

```bash
# Start the server
npm start
```

Then go to [your website](http://localhost:3000)

## How to use

### Model based API

To add routes in your API, you need to create a model like /models/user.model.js and extends BaseModel.

Property tableName need to be defined before call init function.

You can easily modulate your model with 2 variables : requireAuth and hiddenFields;

```js
this.requireAuth = {
	'GET': false,
	'POST': true,
	'PUT': true,
	'DELETE': true
};
this.hiddenFields = [ 'password' ];
```

The variable requireAuth check for each method (GET, POST, PUT, DELETE) if authentication is required, and stop the query if the user isn't authentified.

The variable hiddenFields return for each fields the value '[HIDDEN]', if you don't want some hacker see your data.

If your model is more difficult, you can use different hook :
```js
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
```

For each function, you have access to the user authentified (null if no auth required) and the current request.
You have to do your job here and return the request updated.

And finaly you have the possibility to add custom routes with :
```js
initCustom() {
	/**
	 * Path custom: do something with crud or not
	 */
	 this.app.post('/' + this.tableName + '/custom', (function(req, res) {
		 req.body.table = this.tableName;
		 req.body.hiddenFields = this.hiddenFields;
		 this.verifyAuth(req, res, function(req, res, user) {
			 this.crud.free(req.body, res);
		 });
	 }).bind(this));
}
```

> All request want a JSON object to be used

### Request POST '/authenticate'

Authenticate current user

object.values is required.

JSON Object example :
```json
{
	"values": [
		"ADMIN",
		"ROOT"
	]
}
```

Here, the API check on the table APP_AUTH_TABLE if the fields APP_AUTH_FIELDS correspond to values in JSON object :

Is a 'user' have their fields 'username' = 'ADMIN' and 'password' = 'ROOT'.

You can use how many fields you want but just on one table !

The api send to you a token, use it for the others requests in the HEADERS of your requests with the name 'token'

Example :

Request POST '/' + HEADERS 'token' = 'YOUR_TOKEN'

Else you received a Code 500 Error.

> If you don't want to use Authenticate, please set the variable APP_USE_AUTH to 0 in .env file

### Request POST '/:modelName/add'

Create a new Entity

All fields are required.

JSON Object example :
```json
{
	"fields": [
		"FIELD_1",
		"FIELD_2"
	],
	"values": [
		"VALUE_1",
		"VALUE_2"
	]
}
```

### Request POST '/:modelName'

Get an Entity

JSON Object example :
```json
{
	"fields": [
		"FIELD_1",
		"FIELD_2"
	],
	"where": "FIELD_1 = 'VALUE_1'",
	"order": "FIELD_1 DESC",
	"group": "FIELD_2"
}
```

### Request PUT '/:modelName'

Update an Entity

All fields are required except object.where.

JSON Object example :
```json
{
	"fields": [
		"FIELD_1",
		"FIELD_2"
	],
	"values": [
		"VALUE_1",
		"VALUE_2"
	],
	"where": "FIELD_1 = 'VALUE_1'"
}
```

### Request PUT '/:modelName/delete'

Delete an Entity

object.table is required.

JSON Object example
```json
{
	"where": "FIELD_1 = 'VALUE_1'"
}
```

### Request POST '/:modelName/free'

Query what you want

object.query is required.

JSON Object example
```
{
	"query": "SELECT * FROM TABLE_NAME"
}
```

## Author

* **Adrien Tison** - *Initial work* - [TisonAdrien](https://github.com/TisonAdrien)

## License

This project is licensed under the MIT License


[1]: https://www.npmjs.com/get-npm
