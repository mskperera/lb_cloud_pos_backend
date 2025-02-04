const { default: customAxios } = require('../utils/axios');

// exports.get_connectionDetails_by_tenantId = async (tenantId) => {
//     try {
//         const response = await customAxios.get(`/api/operational/getConnectionDetailsByTenantId?tenantId=${tenantId}`);
//         console.log('Response:', response.data);
//         return response.data;
//       }catch (err) {
//        return err;
//      }
// };



const axios = require('axios');
  
exports.get_connectionDetails_by_tenantId = async (tenantId) => {
    try {
        const response = await axios.get(`http://localhost:7000/api/operational/getConnectionDetailsByTenantId`, {
          params: { tenantId: tenantId }, // Query parameters
          timeout: 5000, // Timeout after 5 seconds
        });
    
        // Handle the response data
        console.log('Tenant Connection Details:', response.data);
        return response.data; // Return the data to the caller
      } catch (error) {
        // Handle errors
        console.error('Error fetching tenant connection details:', error.message);
        throw error; // Rethrow error for the calling function to handle
      }
};