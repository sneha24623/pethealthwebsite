// appointment.js

// Array to store appointments (in memory)
const appointments = [];

// Function to create a new appointment
function createAppointment(userEmail, petName, date) {
  const appointment = { userEmail, petName, date };
  appointments.push(appointment);
  return appointment;
}

// Function to get all appointments
function getAllAppointments() {
  return appointments;
}

// Function to find appointments by user
function getAppointmentsByUser(userEmail) {
  return appointments.filter(app => app.userEmail === userEmail);
}

// Function to find appointments by pet
function getAppointmentsByPet(petName) {
  return appointments.filter(app => app.petName === petName);
}

module.exports = { createAppointment, getAllAppointments, getAppointmentsByUser, getAppointmentsByPet };
