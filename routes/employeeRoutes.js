const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');


router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find(); 
        res.render('home', { employees: employees });
    } catch (err) {
        console.error( err);
        res.status(500).send('Error retrieving employees');
    }
});



router.get('/add', (req, res) => {
  res.render('addEmployee');
});


router.post('/add', async (req, res) => {
    const { name, designation, location, salary } = req.body;
    console.log('Adding Employee:', req.body); 
    try {
      const newEmployee = new Employee({ name, designation, location, salary });
      await newEmployee.save();
      console.log('Employee Added:', newEmployee);
      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });
  

router.post('/edit/:id', async (req, res) => {
  const { name, designation, location, salary } = req.body;
  try {
    await Employee.findByIdAndUpdate(req.params.id, { name, designation, location, salary });
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Server Error');
  }
});


router.post('/delete/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Server Error');
  }
});



module.exports = router;
