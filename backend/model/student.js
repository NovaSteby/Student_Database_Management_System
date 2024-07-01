const mongoose = require('mongoose')
const schema = mongoose.Schema({
    name:String,
    age:Number,
    class:String,
    department:String
})

const studentModel = mongoose.model("student",schema);
module.exports =  studentModel;