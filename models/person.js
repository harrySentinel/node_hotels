const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// define the person schema
const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number
    },
    work:{
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String
       
    },
    salary:{
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

personSchema.pre('save', async function(next){
    const person = this;

    // hash tabhi karo password ko agar wo modify hua ho ya newly add hua ho
    if(! person.isModified('password')) return next();

    try{
        // hash passwor generation
        const salt = await bcrypt.genSalt(10);

        // hash password
        const hashedPassword = await bcrypt.hash(person.password, salt);
        
        // override the plain password with the hashed one
        person.password = hashedPassword;

        next();

    }catch(error){
        return next(error);
    }
});

personSchema.methods.comparePassword = async function(candidatePassword){
    try{
      // bcrypt ka use karenge compare karne ke liye with the provided password with the hashed password
     const isMatch = await bcrypt.compare(candidatePassword, this.password);
     return isMatch;
      
    }catch(err){
        throw err;
    }
}

//create person model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;