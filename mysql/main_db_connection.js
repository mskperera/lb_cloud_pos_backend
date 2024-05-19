const mysql = require('mysql2');

// Create a connection pool
const mainDbConnection_pool = mysql.createPool({
  connectionLimit: 10, // Number of connections to create
  host: 'localhost',
  user: 'maindbUser',
  password: 'Sf2jd#SdB54Sj#$_3$',
  database: 'main_db',
  port:3307
});

// Create a connection pool
const mainDbConnection_error_handler_pool = mysql.createPool({
  connectionLimit: 10, // Number of connections to create
  host: 'localhost',
  user: 'maindbUser',
  password: 'Sf2jd#SdB54Sj#$_3$',
  database: 'main_db',
  port:3307
});

const test=()=>{
// Attempt to get a connection from the pool
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error getting connection from pool:', err);
    return;
  }
  console.error('Connect to the pool.');
    // Release the connection back to the pool when done testing
    connection.release();
})
};




module.exports = {
  test,
  mainDbConnection_pool,
  mainDbConnection_error_handler_pool
};




