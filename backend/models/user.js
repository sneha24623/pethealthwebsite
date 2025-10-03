// user.js

// Array to store users (in memory)
const users = [];

// Function to create a new user
function createUser(name, email, password) {
  // Check if email already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    throw new Error("Email already exists");
  }

  const user = { name, email, password }; // in production, hash password!
  users.push(user);
  return user;
}

// Function to find a user by email
function getUserByEmail(email) {
  return users.find(user => user.email === email);
}

// Function to list all users
function getAllUsers() {
  return users;
}

module.exports = { createUser, getUserByEmail, getAllUsers };
