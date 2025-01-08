const express = require('express');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();
require('./db/connection');

const app = express();


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use('/public', express.static(path.join(__dirname, 'public')));



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


const nav = [
  { link: '/employee', name: 'Home' },
  { link: '/employee/addform', name: 'Add Employee' },
];


const employeeRoutes = require('./routes/employeeRoutes')(nav);
app.use('/employee', employeeRoutes);


const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
