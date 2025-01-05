const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: String,
  designation: String,
  location: String,
  salary: Number
});


const employee = mongoose.model('employee', employeeSchema);

module.exports = employee;