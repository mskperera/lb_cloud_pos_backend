const axios = require('axios');
const { expect } = require('chai');

// Define the base URL for your API and headers
const BASE_URL = 'http://localhost:8000/api'; // Replace with your actual base URL
const headers = {
  'tenantId': '00001', // Replace with actual tenantId
  'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaXNwbGF5TmFtZSI6IlVzZXJBIFNQIiwiZW1haWwiOiJzcG1za3BlcmVyYUBnbWFpbC5jb20iLCJ1c2VySWQiOjEsInVOYW1lIjoic3Btc2twZXJlcmFAZ21haWwuY29tIiwidGVuYW50SWQiOiIwMDAwMSIsImlhdCI6MTcyNTc4MjYzNCwiZXhwIjoxNzM0NDIyNjM0fQ.IGDE1Aj9Sfh0NqRoi0Q9xylF3Vuz0AZhcFg-IdisEE0' // Replace with actual token
};

describe('Product Controller', () => {

  describe('POST /product/add', () => {

    // it('should return 422 if required fields are missing', async () => {
    //   try {
    //     await axios.post(`${BASE_URL}/product/add`, {
    //       // Omit some required fields to test the error response
    //     }, { headers });

    //   } catch (error) {
    //    // console.log('Product Controller error',error);
    //    // expect(error.response.status).to.equal(422);
    //    // expect(error.response.data).to.have.property('error');
    //    // expect(error.response.data.error).to.have.property('message');
    //   }
    // });

    it('should add a product successfully with valid data', async () => {
      try {


        const response = await axios.post(`${BASE_URL}/product/add`, {
          tableId: null,
          storeIdList: [1, 2],
          productNo: '9832',
          isProductNoAutoGenerate: true,
          productName: 'product 24444 combo',
          categoryIdList: [1, 2],
          variationProductList: [
            {
              sku: 'sku24442',
              barcode: '24442',
              variationDetails: [
                { variationTypeId: 1, variationValue: 'SMALL' },
                { variationTypeId: 2, variationValue: 'RED' }
              ]
            },
            {
              sku: 'sku34442',
              barcode: '34442',
              variationDetails: [
                { variationTypeId: 2, variationValue: 'BLUE' },
                { variationTypeId: 1, variationValue: 'SMALL' }
              ]
            }
          ],
          comboProductDetailList: [
            { qty: '2', productId_mat: 16, variationProductId_mat: null },
            { qty: '1.5', productId_mat: 17, variationProductId_mat: null },
            { qty: '1', productId_mat: null, variationProductId_mat: 22 }
          ],
          measurementUnitId: 1,
          productTypeId: 3,
          isNotForSelling: false,
          imgUrl: null,
          isUnique: false,
          isStockTracked: false,
          costPrice: 0,
          brandId: 1,
          unitPrice: 150.50,
          sku: 'sku4442',
          barcode: null,
          reorderLevel: 10
        }, { headers });

        console.log('Product Controlle000000000000000',response)

        //expect(response.status).to.equal(200);
       // expect(response.data).to.not.have.property('error');
        // Add more assertions based on the expected response
      } catch (error) {
        throw new Error('Failed to add product: ' + error.message);
      }
    });

    // it('should return 400 if there is a server error', async () => {
    //   try {
    //     await axios.post(`${BASE_URL}/product/add`, {
    //       tableId: null,
    //       storeIdList: [1, 2],
    //       productNo: '9832',
    //       isProductNoAutoGenerate: true,
    //       productName: 'product 24444 combo',
    //       categoryIdList: [1, 2],
    //       variationProductList: [
    //         {
    //           sku: 'sku24442',
    //           barcode: '24442',
    //           variationDetails: [
    //             { variationTypeId: 1, variationValue: 'SMALL' },
    //             { variationTypeId: 2, variationValue: 'RED' }
    //           ]
    //         },
    //         {
    //           sku: 'sku34442',
    //           barcode: '34442',
    //           variationDetails: [
    //             { variationTypeId: 2, variationValue: 'BLUE' },
    //             { variationTypeId: 1, variationValue: 'SMALL' }
    //           ]
    //         }
    //       ],
    //       comboProductDetailList: [
    //         { qty: '2', productId_mat: 16, variationProductId_mat: null },
    //         { qty: '1.5', productId_mat: 17, variationProductId_mat: null },
    //         { qty: '1', productId_mat: null, variationProductId_mat: 22 }
    //       ],
    //       measurementUnitId: 1,
    //       productTypeId: 3,
    //       isNotForSelling: false,
    //       imgUrl: null,
    //       isUnique: false,
    //       isStockTracked: false,
    //       costPrice: 0,
    //       brandId: 1,
    //       unitPrice: 150.50,
    //       sku: 'sku4442',
    //       barcode: null,
    //       reorderLevel: 10
    //     }, { headers });
    //   } catch (error) {
    //     expect(error.response.status).to.equal(400);
    //     expect(error.response.data).to.have.property('error');
    //     expect(error.response.data.error).to.have.property('message');
    //   }
    // });

  });

  // Similar tests can be written for the other routes: update, delete, get products, etc.

});
