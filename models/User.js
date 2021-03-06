const sql = require("../database/connection");

var UserModel = function () {};

UserModel.findAll = function (callback) {
  sql.query(
    "SELECT id, name, email FROM users ORDER BY id",
    (err, rows, fields) => {
      if (err) return callback(true, null);
      else {
        return callback(null, rows);
      }
    }
  );
};

UserModel.findOne = function (id, callback) {
  sql.query(
    "SELECT id, name, email, phone, profile_pics FROM users WHERE id = ?",
    id,
    (err, rows, fields) => {
      if (err) return callback(true, null);
      else {
        return callback(null, rows[0]);
      }
    }
  );
};

UserModel.register = function (post, callback) {
  sql.query("INSERT INTO users SET ?", post, (err, rows, fields) => {
    if (err) return callback(true, null);
    else return callback(null, rows);
  });
};

UserModel.validation = function (check, callback) {
  sql.query(
    "SELECT id, email, password FROM users WHERE email = ?",
    check,
    (err, rows, fields) => {
      if (err) return callback(true, null);
      else {
        return callback(null, rows[0]);
      }
    }
  );
};

UserModel.uploadpics = function (data, callback) {
  sql.query(
    "UPDATE users SET profile_pics = ? WHERE id = ?",
    data,
    (err, rows, fields) => {
      if (err) return callback(true, null);
      else return callback(null, rows);
    }
  );
};

UserModel.uploadproduct = function (data, callback) {
  sql.query("INSERT INTO products SET ?", data, (err, rows, fields) => {
    if (err) {
      console.log(err)
      return callback(true, null);
    }else return callback(null, rows);
  });
};

UserModel.update = function (data, callback) {
  sql.query(
    "UPDATE users SET password = ? WHERE email = ?",
    data,
    (err, rows, fields) => {
      if (err) return callback(true, null);
      else return callback(null, rows);
    }
  );
};

UserModel.delete = function (id, callback) {
  sql.query("DELETE FROM users WHERE id = ?", id, (err, rows, fields) => {
    if (err) return callback(true, null);
    else {
      return callback(null, rows);
    }
  });
};

module.exports = UserModel;
