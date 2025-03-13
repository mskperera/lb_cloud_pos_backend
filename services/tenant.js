const axios = require('axios');

exports.get_connectionDetails_by_tenantId = async (tenantId) => {
    try {

        const response = await axios.get(`${process.env.OPERATIONAL_SERVICE_URL}/operational/getConnectionDetailsByTenantId`, {
          headers: { "x-api-key": process.env.OPERATIONAL_API_KEY },
          params: { tenantId: tenantId },
          timeout: 10000,// 10 seconds
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching tenant connection details:', error.message);
        throw error;
      }
};