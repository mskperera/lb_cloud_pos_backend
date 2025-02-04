const axios =require('axios');

const customAxios = axios.create({
  baseURL: process.env.OPERATIONAL_SERVICE_URL
});

// // Add request interceptor
// customAxios.interceptors.request.use(
//   function (config) {
//     console.error('OPERATIONAL_SERVICE_URL:', process.env.OPERATIONAL_SERVICE_URL);
//     return config; // No token logic
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

// // Add response interceptor
// customAxios.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function (error) {
//     console.error('Axios error:', error.message);
//     if (error.response) {
//       if (error.response.status === 401 || error.response.status === 403) {
//         console.error('Unauthorized or forbidden request');
//       }
//     }
//     return Promise.reject(error);
//   }
// );

module.exports={customAxios};

