/**
 * CRUD file
 * CRUD is for Create Read Update Delete
 */

require('./db');
const jwt = require('jsonwebtoken');

/**
 * Class CRUD
 */
module.exports = class CRUD {

  /**
   * Function authenticate
   * @params request: object
   * @params res: res for sending results
   * filters: object.values
   */
  authenticate(request, res) {
    let fields = process.env.APP_AUTH_FIELDS.split(',');

    let query = 'SELECT * FROM `' + process.env.APP_AUTH_TABLE + '` WHERE ';
    for (var i = fields.length - 1; i >= 0; i--) {
      query += '`' + fields[i] + '` = ' + db.escape(request.values[i]);
      if (i != 0) {
        query += ' AND ';
      }
    }

    try {
      db.query(query, (error, result) => {
        if (error) {
          res.json({
            error: error
          });
        } else {
          if (result.length == 0) {
            res.status(500).send("Unauthorized.");
          } else {
            let token = jwt.sign(JSON.parse(JSON.stringify(result[0])), process.env.APP_AUTH_SECRET, {
              expiresIn: process.env.APP_TOKEN_EXPIRES
            });
            res.json({
              authentcate: true,
              token: token
            });
          }
        }
      });
    } catch (exception) {
      console.log(exception);
      return exception;
    }

  }

  /**
   * Function create
   * @params request: object
   * @params res: res for sending results
   * filters: object.fields, object.values
   */
  create(request, res) {

    let fieldsEscaped = [];
    let valuesEscaped = [];

    for (var i = request.fields.length - 1; i >= 0; i--) {
      fieldsEscaped[i] = '`' + request.fields[i] + '`';
      valuesEscaped[i] = db.escape(request.values[i]);
    }

    let query = 'INSERT INTO `' + request.table + '`(' + fieldsEscaped.join() + ') VALUES(' + valuesEscaped.join() + ')';

    try {
      db.query(query, (error, result) => {
        if (error) {
          res.json({
            error: error
          });
        } else {
          res.json({
            results: result
          });
        }
      });
    } catch (exception) {
      console.log(exception);
      return exception;
    }
  }

  /**
   * Function read
   * @params request: object
   * @params res: res for sending results
   * filters: object.fields, object.where, object.order, object.group
   */
  read(request, res) {

    let fieldsEscaped = [];

    if (request.fields === undefined) {
      fieldsEscaped = ['*'];
    } else {
      for (var i = request.fields.length - 1; i >= 0; i--) {
        fieldsEscaped[i] = '`' + request.fields[i] + '`';
      }
    }

    try {

      let query = 'SELECT ' + fieldsEscaped.join() + ' FROM `' + request.table + '`';

      if (request.where !== undefined) {
        query += ' WHERE ' + request.where;
      }

      if (request.order !== undefined) {
        query += ' ORDER BY ' + request.order;
      }

      if (request.group !== undefined) {
        query += ' GROUP BY ' + request.group;
      }

      db.query(query, (error, result) => {
        if (error) {
          res.json({
            error: error
          });
        } else {
          res.json({
            results: result
          });
        }
      });

    } catch (exception) {
      console.log(exception);
      return exception;
    }
  }

  /**
   * Function update
   * @params request: object
   * @params res: res for sending results
   * filters: object.fields, object.values, object.where
   */
  update(request, res) {
    let query = 'UPDATE `' + request.table + '` SET ';

    for (var i = request.fields.length - 1; i >= 0; i--) {
      query += '`' + request.fields[i] + '`= ' + db.escape(request.values[i]);
      if (i != 0) {
        query += ', ';
      }
    }

    if (request.where !== undefined) {
      query += ' WHERE ' + request.where;
    }

    try {
      db.query(query, (error, result) => {
        if (error) {
          res.json({
            error: error
          });
        } else {
          res.json({
            results: result
          });
        }
      });
    } catch (exception) {
      console.log(exception);
      return exception;
    }
  }

  /**
   * Function delete
   * @params request: object
   * @params res: res for sending results
   * filters: object.where
   */
  delete(request, res) {
    let query = 'DELETE FROM `' + request.table + '`';

    if (request.where !== undefined) {
      query += ' WHERE ' + request.where;
    }

    try {
      db.query(query, (error, result) => {
        if (error) {
          res.json({
            error: error
          });
        } else {
          res.json({
            results: result
          });
        }
      });
    } catch (exception) {
      console.log(exception);
      return exception;
    }
  }

  /**
   * Function free
   * @params request: object
   * @params res: res for sending results
   */
  free(request, res) {
    try {
      db.query(request.query, (error, result) => {
        if (error) {
          res.json({
            error: error
          });
        } else {
          res.json({
            results: result
          });
        }
      });
    } catch (exception) {
      console.log(exception);
      return exception;
    }
  }
};