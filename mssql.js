const sql = require('mssql');

const config = {
  user: 'sp1',
  password: '1234',
  server: '192.168.8.171',
  database: 'LBCPOS',
  options: {
    encrypt: false, // For Azure SQL Database, set to true
    //trustServerCertificate: true,
   // instancename:  'MSSQLSERVER'  // SQL Server instance name
  },
  port:1433,
};

const pool = new sql.ConnectionPool(config);
pool.connect()
  .then(() => {
    console.log('Connected to MSSQL database');

  })
  .catch((err) => {
    console.error('Error connecting to MSSQL database:', err);
  });


  




module.exports = {
  sql,
  // poolConnect,
  pool
};




