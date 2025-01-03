
const mongoose = require('mongoose');

const addressSchema=mongoose.Schema({
    country:String,
    city:String,
    locality:String
});

const profileSchema=mongoose.Schema({
    Bio:String,
    contact:String,
   addressSchema:addressSchema
    
});
module.exports= mongoose.model('Profile',profileSchema);