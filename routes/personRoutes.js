const express = require('express');
const router = express.Router();
const Person =  require('./../models/person');
const {jwtAuthMiddleware, generateToken} = require('./../jwt')

// POST route to add a person
router.post('/signup', async(req, res) =>{

    try{
       const data = req.body // assume kar rhe request body person data ko contain kr rhi

       // create a new person document using the Mongoose model
       const newPerson = new Person(data);

       // save the new person to the database
       const response = await newPerson.save();
       console.log('data saved of person');

       const payload = {
           id: response.id,
           username: response.username
       }
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log("Token is : ", token);

       res.status(200).json({response: response, token: token});
    }
    catch(err){
       console.log(err);
       res.status(500).json({error: 'Internal Server Error'});
    }
  
})

// Login Routes
router.post('/login', async(req, res) => {
    try{
        // extract the username and password from request body
        const {username, password} =  req.body;

        // find the user by username
        const user = await Person.findOne({username: username});

        // if user does not exist or password does not match, return error
        if( !user || ! (await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        // generate Token
        const payload = {
            id : user.id,
            username: user.username
        }
        const token = generateToken(payload);

        // return token as reponse 
        res.json({token});
    }catch(error){
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

// Profile route
router.get('/profile',jwtAuthMiddleware, async (req, res) => {
    
    try{
        const userData = req.user;
        console.log("User Data: ", userData);

        const userId = userData.id;
        const user = await Person.findById(userId);

        res.status(200).json({user});
    }catch(error){
        console.log(error);
        res.status(500).json({error : 'Internal Server Error'});
    }
})

//GET route to add a person
router.get('/', jwtAuthMiddleware,  async (req, res) => {
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