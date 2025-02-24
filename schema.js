const mongoose = require('mongoose')

const objectschema = new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String},
    dob:{type:Number},
    address:{type:Number},
    message:{type:String},
    fatherName:{type:String},
    motherName:{type:String},
    noofsiblings:{type:Number},
    date:{type:Date}
})
const objects = mongoose.model("object",objectschema)

module.exports = mongoose.model('objects',objectschema)