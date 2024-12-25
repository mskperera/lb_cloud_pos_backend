const { expect } = require('chai');
const { getUserById, createUser } = require('../services/userService');
// test/UserService.test.js

describe('UserService', () => {

  describe('getUserById', () => {
    it('should return a user when a valid ID is provided', () => {
      const user = getUserById(1);
      expect(user).to.have.property('name', 'Alice');
      expect(user).to.have.property('email', 'alice@example.com');
    });

    it('should return undefined when an invalid ID is provided', () => {
      const user = getUserById(999);
      expect(user).to.be.undefined;
    });
  });

//   describe('createUser', () => {
//     it('should create and return a new user when valid data is provided', () => {
//       const newUser = createUser('Charlie', 'charlie@example.com');
//       expect(newUser).to.have.property('id').that.is.a('number');
//       expect(newUser).to.have.property('name', 'Charlie');
//       expect(newUser).to.have.property('email', 'charlie@example.com');
//     });

//     it('should throw an error when name or email is missing', () => {
//       expect(() => createUser(null, 'email@example.com')).to.throw('Name and email are required');
//       expect(() => createUser('Name', null)).to.throw('Name and email are required');
//     });
//   });
});
