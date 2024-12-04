// services/UserService.js

const users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' }
  ];
  
  const getUserById = (id) => {
    return users.find(user => user.id === id);
  };
  
  const createUser = (name, email) => {
    if (!name || !email) {
      throw new Error('Name and email are required');
    }
    const newUser = {
      id: users.length + 1,
      name,
      email
    };
    users.push(newUser);
    return newUser;
  };
  
  module.exports = {
    getUserById,
    createUser
  };
  