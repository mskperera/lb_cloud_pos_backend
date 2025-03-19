
// const executeStoredProcedureWithOutputParamsByPool = async (procedureName, inputParameters, outputParameters,pool) => {
//   return new Promise((resolve, reject) => {
//     const inputPlaceholders = inputParameters.map(() => '?').join(', ');
//     const outputPlaceholders =outputParameters.length!==0? (',' +outputParameters.map((paramName) => `@${paramName}`).join(', ')) :'';

//     // Create a SQL query with both input and output parameters
//     const sqlQuery = `CALL ${procedureName}(${inputPlaceholders} ${outputPlaceholders})`;

//     pool.getConnection((err, connection) => {
   
//       // Always release the connection, even on error
//       connection.release();
//       //releaseConnectionSafely(connection);

//       if (err) {
//         console.error('Error acquiring connection from pool:', err);
//         reject(err);
//         return;
//       }

//       connection.query(sqlQuery, [...inputParameters], (error, results, fields) => {
//         if (error) {
//           console.error('Error executing query:', error);
//           reject(error);
//           return;
//         }

//         // Create an object to store the output parameter values
//         const outputValues = {};

//         // Wait for all output parameter queries to complete
//         Promise.all(
//           outputParameters.map((paramName) =>
//             new Promise((resolve) => {
//               connection.query(`SELECT @${paramName} as ${paramName}`, (err, output) => {
//                 if (err) {
//                   console.error(`Error fetching the output parameter ${paramName}:`, err);
//                   resolve();
//                   return;
//                 }

//                 outputValues[paramName] = output[0][paramName];
//                 resolve();
//               });
//             })
//           )
//         ).then(() => {

//           resolve({results,outputValues});

//           // Release the connection back to the pool
//           console.log('connection released');
//           connection.release();
//         });
//       });
//     });
//   });
// };

const executeStoredProcedureWithOutputParamsByPool = async (procedureName, inputParameters, outputParameters, pool) => {
  return new Promise((resolve, reject) => {
    const inputPlaceholders = inputParameters.map(() => '?').join(', ');
    const outputPlaceholders = outputParameters.length !== 0 ? (', ' + outputParameters.map((paramName) => `@${paramName}`).join(', ')) : '';

    // Create a SQL query with both input and output parameters
    const sqlQuery = `CALL ${procedureName}(${inputPlaceholders} ${outputPlaceholders})`;

    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error acquiring connection from pool:', err);
        reject(err);
        return;
      }

      connection.query(sqlQuery, [...inputParameters], (error, results) => {
        if (error) {
          console.error('Error executing query:', error);
          connection.release();  // Ensure connection is released on error
          reject(error);
          return;
        }

        // Create an object to store the output parameter values
        const outputValues = {};

        // Wait for all output parameter queries to complete
        Promise.all(
          outputParameters.map((paramName) =>
            new Promise((resolve) => {
              connection.query(`SELECT @${paramName} as ${paramName}`, (err, output) => {
                if (err) {
                  console.error(`Error fetching the output parameter ${paramName}:`, err);
                } else {
                  outputValues[paramName] = output[0] ? output[0][paramName] : null;
                }
                resolve();
              });
            })
          )
        ).then(() => {
          resolve({ results, outputValues });
          connection.release();  // Release connection only after all queries are done
          console.log('Connection released successfully.');
        }).catch((err) => {
          console.error('Error in fetching output parameters:', err);
          connection.release();  // Ensure connection is released even on error
          reject(err);
        });
      });
    });
  });
};


const releaseConnectionSafely = (connection) => {
  if (connection && connection.state !== 'disconnected') {
    connection.release();
    console.log('Connection released');
  } else {
    console.log('Connection already closed or not initialized');
  }
};


const executeSqlQueryWithOutputParamsByPool = async (sqlQuery, inputParameters, outputParameters, pool) => {
  return new Promise((resolve, reject) => {
    const inputPlaceholders = inputParameters.map(() => '?').join(', ');
    const outputPlaceholders = outputParameters.length !== 0 ? (',' + outputParameters.map((paramName) => `@${paramName}`).join(', ')) : '';

    // Create a SQL query with both input and output parameters
    const fullSqlQuery = `${sqlQuery} ${outputPlaceholders}`;

    pool.getConnection((err, connection) => {
    
      // Always release the connection, even on error
      connection.release();

      if (err) {
        console.error('Error acquiring connection from pool:', err);
        reject(err);
        return;
      }

      connection.query(fullSqlQuery, [...inputParameters], (error, results, fields) => {
        if (error) {
          console.error('Error executing query:', error);
          reject(error);
          return;
        }

        // Create an object to store the output parameter values
        const outputValues = {};

        // Wait for all output parameter queries to complete
        Promise.all(
          outputParameters.map((paramName) =>
            new Promise((resolve) => {
              connection.query(`SELECT @${paramName} as ${paramName}`, (err, output) => {
                if (err) {
                  console.error(`Error fetching the output parameter ${paramName}:`, err);
                  resolve();
                  return;
                }

                outputValues[paramName] = output[0][paramName];
                resolve();
              });
            })
          )
        ).then(() => {
          resolve({ results, outputValues });

          // Release the connection back to the pool
          console.log('Connection released');
          connection.release();
        });
      });
    });
  });
};


module.exports = {
  executeStoredProcedureWithOutputParamsByPool,
  executeSqlQueryWithOutputParamsByPool
};




