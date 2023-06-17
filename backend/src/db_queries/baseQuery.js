import mysql from "mysql2";

import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
  host: process.env.REACT_APP_MYSQL_HOST,
  user: process.env.REACT_APP_MYSQL_USER,
  password: process.env.REACT_APP_MYSQL_PASSWORD,
  database: process.env.REACT_APP_MYSQL_DATABASE,
  debug: false,
});

async function userQuery(query, parameters) {
  if (parameters === undefined) {
    return new Promise(function (resolve, reject) {
      pool.query(query, function (err, results, fields) {
        if (err) return reject(err);
        return resolve(results);
      });
    });
  }
  return new Promise(function (resolve, reject) {
    pool.query(query, parameters, function (err, results, fields) {
      if (err) return reject(err);
      return resolve(results);
    });
  });
}

export default userQuery;
