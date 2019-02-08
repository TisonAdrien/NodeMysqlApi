/**
 * CRUD file
 * CRUD is for Create Read Update Delete
 */

require('./db');

/**
 * Class CRUD
 */
module.exports = class CRUD {

  /**
   * Function create
   * @params request: object
   * @params res: res for sending results
   * filters: object.fields, object.values
   */
  create(request, res) {
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

  /**
   * Function read
   * @params request: object
   * @params res: res for sending results
   * filters: object.fields, object.where, object.order, object.group
   */
  read(request, res) {

    if (request.fields === undefined) {
      request.fields = ['*'];
    }

    try {

      let query = 'SELECT ' + request.fields.join() + ' FROM ' + request.table;

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
    // TODO
  }

  /**
   * Function delete
   * @params request: object
   * @params res: res for sending results
   * filters: object.fields, object.values
   */
  delete(request, res) {
    // TODO
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