const chai = require('chai');
const server = require('../server'); // Import your Express app
const chaiHttp = require('chai-http');
//const request=require('supertest');

//Assertion Style
chai.should();

chai.use(chaiHttp);


describe('User API', () => {
  // Test the POST route
  describe('POST /api/customer/customers', () => {
    it('should search all customers and have the expected structure', (done) => {
      const obj = {
        customerId: null,
        customerCode: null,
        customerName: null,
        email: null,
        mobile: null,
        tel: null,
        whatsappNumber: null,
        searchByKeyword: false,
        skip: 0,
        limit: 10,
      };

      chai.request(server)
        .post('/api/customer/customers')
        .send(obj)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.an('object');
          response.body.should.have.property('results').that.is.an('array').with.lengthOf.at.least(1);

          const firstResult = response.body.results[0][0];
          firstResult.should.have.property('CustomerID');
          firstResult.should.have.property('CustomerCode');
          firstResult.should.have.property('CustomerName');
          firstResult.should.have.property('Email');
          firstResult.should.have.property('Mobile');
          firstResult.should.have.property('Tel');
          firstResult.should.have.property('WhatsappNumber');
          firstResult.should.have.property('Remark');
          firstResult.should.have.property('CreatedDate_UTC');
          firstResult.should.have.property('ModifiedDate_UTC');
          firstResult.should.have.property('UserLogID');

          response.body.should.have.property('outputValues').that.is.an('object');
          response.body.outputValues.should.have.property('responseStatus').equal('success');
          response.body.outputValues.should.have.property('outputMessage').equal('loaded successfully');
          response.body.outputValues.should.have.property('totalRows').that.is.a('number');

          done();
        });
    });
  });
});