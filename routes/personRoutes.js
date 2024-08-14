const express = require('express');
const router = express.Router();
const Person =  require('./../models/person');
// const { findByIdAndUpdate } = require('../models/MenuItem');

// POST route to add a person
router.post('/signup', async(req, res) =>{

    try{
       const data = req.body // assume kar rhe request body person data ko contain kr rhi

       // create a new person document using the Mongoose model
       const newPerson = new Person(data);

       // save the new person to the database
       const response = await newPerson.save();
       console.log('data saved of person');
       res.status(200).json(response);
    }
    catch(err){
       console.log(err);
       res.status(500).json({error: 'Internal Server Error'});
    }
  
})

//GET route to add a person
router.get('/signup', async (req, res) => {
    try{
      const harry = await Person.find();
      console.log('data fetched of person');
      res.status(200).json(harry);

    } catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
     }
})

router.get('/:workType', async(req, res) =>{
    try{
     const workType = req.params.workType; // Extract the work type from the URL parameter 
     if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
        const response = await Person.find({work: workType});
        console.log('response fetch ho gaya worktype ka');
        res.status(200).json(response);
     }else{
        res.status(404).json({error: 'invalid work type'});
     }
    }catch(err){
         console.log(err);
         res.status(500).json({error: 'internal server error'});
    }
})

router.put('/:id', async (req, res) => {
    try{
      const personId = req.params.id; // extracting the id from the URL parameter
      const updatedPersonData = req.body; // updated data for the person

      const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
          new: true, // Return the updated document
          runValidators: true, // Run Mongoose validation
      })

      if(!response){
        return res.status(404).json({error: 'Person not found'});
      }

      console.log('data updated');
      res.status(200).json(response);

    } catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }
})

router.delete('/:id' , async (req, res) => {
    try{
     const personId = req.params.id; // extacting the person's ID from the URL parameter

     // assuming i have a person model
     const response = await Person.findByIdAndDelete(personId);

     if(! response){
        return res.status(404).json({ error: 'person not found'});
     }

     console.log('data delete');
    res.status(200).json({message: 'person deleted successfully'});

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'})
    }
} )

module.exports = router;