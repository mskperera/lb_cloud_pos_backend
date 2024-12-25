const mysql = require("mysql2");
const { get_connectionDetails_by_tenantId } = require("../sql/operational");

const createMysqlPool = (host, user, password, database, connectionLimit = 10) => {
    // Create a connection pool

const credentials={
  connectionLimit: connectionLimit, // Number of connections to create
  host: host,
  user: user,
  password: password
};

if(database){
  credentials.database = database;
}
    const pool = mysql.createPool(credentials);
};



const tenantList=[];

const getTenant=async(tenantId)=>{
  
  let foundTenant = tenantList.find((item) => item.tenantId === tenantId);
  if (!foundTenant) {

    const tenant = await get_connectionDetails_by_tenantId(tenantId);
    const { connectionId, hostName, dbUsername, dbPassword, dbName,port,jwtSecret } = tenant;
    console.log('tenant poollist',tenant);
    // Create a connection pool
    const pool = mysql.createPool({
      connectionLimit: 40, // Number of connections to create
      host: hostName,
      user: dbUsername,
      password: dbPassword,
      database: dbName,
      port
    });

    // const pool = mysql.createPool({
    //   connectionLimit: 10, // Small pool for efficiency
    //   host: hostName,
    //   user: dbUsername,
    //   password: dbPassword,
    //   database: dbName,
    //   port,
    //   waitForConnections: true,
    //   queueLimit: 0, // Prevent rejecting requests when all connections are busy
    //   connectTimeout: 10000, // 10-second timeout
    // });

    

    foundTenant = { pool, tenantId,jwtSecret };
    tenantList.push(foundTenant);
    console.log('new pool is added to the poollist');
  }

  const tenant = tenantList.filter((p) => p.tenantId === tenantId)[0];

  const tenantData = tenantList.map((item) => ({
    tenantId: item.tenantId,
    poolStatus: item.pool._allConnections.length, // This line gets the number of connections in the pool
  }));
  console.log('tenantData iiii',tenantData)

  return tenant;
  ///const {pool}=foundTenant;
}



module.exports = {
  getTenant
};





// const createMysqlPool = (host, user, password, database, connectionLimit = 10) => {
//   return new Promise((resolve, reject) => {
//     // Create a connection pool
//     const pool = mysql.createPool({
//       connectionLimit: connectionLimit, // Number of connections to create
//       host: host,
//       user: user,
//       password: password,
//       database: database,
//     });

//     // Ensure the pool is ready before resolving the promise
//     pool.getConnection((err, connection) => {
//       if (err) {
//         reject(err);
//       } else {
//         connection.release(); // Release the initial connection
//         resolve(pool);
//       }
//     });
//   });
// };