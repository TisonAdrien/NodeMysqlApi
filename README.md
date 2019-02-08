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
```

### Runing

```bash
# Start the server
npm start
```

Then go to [your website](http://localhost:3000)

## How to use

> All request want a JSON object to be used

### Request POST '/add'

// TODO

Create a new Entity

All fields are required.

JSON Object example :
```json
{
	"table": "TABLE_NAME",
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

### Request POST '/'

Get an Entity

object.table is required.

JSON Object example :
```json
{
	"table": "TABLE_NAME",
	"fields": [
		"FIELD_1",
		"FIELD_2"
	],
	"where": "FIELD_1 = 'VALUE_1'",
	"order": "FIELD_1 DESC",
	"group": "FIELD_2"
}
```

### Request PUT '/'

// TODO

Update an Entity

All fields are required except object.where.

JSON Object example :
```json
{
	"table": "TABLE_NAME",
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

### Request DELETE '/'

// TODO

Delete an Entity

object.table is required.

JSON Object example
```json
{
	"table": "TABLE_NAME",
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

### Request POST '/free'

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