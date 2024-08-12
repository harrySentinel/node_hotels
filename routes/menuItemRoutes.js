const express = require('express');
const router = express. Router();
const MenuItem =  require('./../models/MenuItem');


// POST route to add menuitem
router.post('/', async (req, res) => {
    try{
   const item = req.body  // assume kar rhe req body menuitem ko contain kar rhi
   
   // create a new menu item document using the Mongoose model
     const newMenuItem = new MenuItem(item);

   // save the new menu item to the database
   const response = await newMenuItem.save();
   console.log('data saved in menu')
   res.status(200).json(response);

    }catch(err){
     console.log(err);
     res.status(500).json({error : 'internal server error'})
    }
})

//GET method to get the menu item
router.get('/', async (req, res) => {
    try{
     const fetch = await MenuItem.find();
     console.log('data fetched of menu')
     res.status(200).json(fetch);

    } catch(err){
       console.log('err');
       res.status(500).json({error: 'internal server error'})
    }
})

// for updation

router.put('/:id', async (req, res) => {
    try{
      const menuitemId = req.params.id; // extracting the id from the URL parameter
      const updatedPersonData = req.body; // updated data for the person

      const response = await MenuItem.findByIdAndUpdate(menuitemId, updatedPersonData, {
          new: true, // Return the updated document
          runValidators: true, // Run Mongoose validation
      })

      if(!response){
        return res.status(404).json({error: 'menu not found'});
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
     const menuitemId = req.params.id; // extacting the person's ID from the URL parameter

     // assuming i have a person model
     const response = await MenuItem.findByIdAndDelete(menuitemId);

     if(! response){
        return res.status(404).json({ error: 'menu not found'});
     }

     console.log('data delete');
    res.status(200).json({message: 'menu list deleted successfully'});

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'})
    }
} )

// comment added for testing purposes
module.exports = router;