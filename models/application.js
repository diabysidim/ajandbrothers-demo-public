const mongoose  = require('mongoose');

const applicationSchema = new mongoose.Schema({

    lastName : String,
    name : String,
    passport : String, 
    email : String,
    phone : String,
    birthDate : String, 
    birthPlace : String,
    gender : String,
    marriage : String,
    bac : String,
    bacYear : String,
    streetAddress : String,
    City : String,
    zipcode : String,
    sponsorLastName : String,
    sponsorName : String,
    sponsorEmail : String,
    sponsorPhone : String,
    sponsorStreetAddress : String,
    sponsorCity : String,
    sponsorZipcode : String,
    consent : String
    
})


module.exports  = mongoose.model("Application", applicationSchema);