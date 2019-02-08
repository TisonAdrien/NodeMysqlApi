# Node MYSQL API

> Create global API provided by a NodeJS server with a MYSQL database

## Getting Started

### Prerequisites

The project is based on NodeJS then you have to install it.

* [Install NodeJS and npm][1].

### Installing

First step : Install the project and install dependencies.

```
# install project
npm install git+https://github.com/TisonAdrien/NodeMysqlApi.git

# Go to directory
cd NodeMysqlApi

# install dependencies
npm install
```

Second step : configure your database profile in .env
```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=database
DB_USER=root
DB_PASSWORD=root

APP_PORT=3000
```

### Runing

```
# Start the server
npm start
```

Then go to [your website](http://localhost:3000)

## Author

* **Adrien Tison** - *Initial work* - [TisonAdrien](https://github.com/TisonAdrien)

## License

This project is licensed under the MIT License


[1]: https://www.npmjs.com/get-npm