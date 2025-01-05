const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const employeeRoutes = require('./routes/employeeRoutes');




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));

// MongoDB Connection
mongoose.connect('mongodb+srv://ashwinijs:abcABC123@cluster0.y8zfj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));



app.use('/', employeeRoutes);


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on 5000`));
