const express = require('express');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const employeeModel = require('../model/employeeData');

function employeeroutes(nav) {
    
    router.get('/', async (req, res) => {
        try {
            const data = await employeeModel.find();
            res.render('home', { title: "Employees",data,nav});
        } catch (error) {
            res.status(404).send("Data not found");
        }
    })


    router.get('/addform', (req, res) => {
        res.render('addemployee', { title: "Add Employee",nav});
    })

   
    router.get('/updatepage/:id', async (req, res) => {
            const data = await employeeModel.findOne({_id:req.params.id});
            res.render('updateform', { title: "Update Employee",data,employeeid:req.params.id,nav});
    })
      


    router.post('/updatepage/:id', async (req, res) => {
    try {
        const updatedData = await employeeModel.findByIdAndUpdate(req.params.id,req.body);
          res.redirect('/employee'); 
    } catch (error) {
        res.status(404).send("Data not updated");
    }
    });



    router.post('/addform', async (req, res) => {
        try {
            const item = req.body;
            const data = new employeeModel(item);
            await data.save();
            res.redirect('/employee');
        } catch (error) {
        res.status(404).send("Data not inserted");
        }
    });
   


    router.post('/delete/:id', async (req, res) => {
        try {
            const data = await employeeModel.findByIdAndDelete(req.params.id);
            res.redirect('/employee');
        } catch (error) {
            res.status(404).send("Data not deleted");
        }
    });

    return router;
}

module.exports = employeeroutes;

