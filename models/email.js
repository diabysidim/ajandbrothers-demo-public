
const mongoose =  require('mongoose');


const emailSchema = new mongoose.Schema({

    SenderName: String,
    SenderEmail : String,
    Subject:  String,
    Content: String 



})

module.exports =  mongoose.model("Email", emailSchema);