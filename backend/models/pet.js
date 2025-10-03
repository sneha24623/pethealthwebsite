// pet.js

// Array to store pets (in memory)
const pets = [];

// Function to create a new pet
function createPet(name, species) {
  const pet = { name, species, adopted: false };
  pets.push(pet);
  return pet;
}

// Function to get all pets
function getAllPets() {
  return pets;
}

// Function to find a pet by name
function getPetByName(name) {
  return pets.find(pet => pet.name === name);
}

// Function to mark a pet as adopted
function adoptPet(name) {
  const pet = getPetByName(name);
  if (pet) {
    pet.adopted = true;
    return pet;
  }
  return null;
}

module.exports = { createPet, getAllPets, getPetByName, adoptPet };
