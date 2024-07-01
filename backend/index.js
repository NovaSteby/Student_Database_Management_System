 //1. import express
var express = require('express');
var cors = require('cors');
require('./connection');
const student = require('./model/student');
// 2.initialization
var app = express()


// middleware
app.use(express.json()) //to accept json format
app.use(cors());

app.post('/add-student' ,async(req,res)=>{
    try {
        console.log(req.body)
        await student(req.body).save()
        res.send({message:"data added"})
    } catch (error) {
        console.log(error)
    }
})
app.get('/view',async(req,res)=>{
    try {
        console.log("to view") 
        const data = await student.find()
        res.send(data)
    } catch (error) {
        console.log(error)
    }
})
// // 3.api
// app.get('/',(req,res)=>{
//     res.send("Hello Nova Polwin")
// })
// app.get('/login',(req,res)=>{
//     res.send("Loged in sucessfully!!")
// })
// // to add data to db
// app.post('/add',async(req,res)=>{
//    try {
//       console.log(req.body);
//      await user(req.body).save() //save the data to model 
//       res.send({message:"data added successfully!!"})
//    } catch (error) {
//       console.log(error)
//    }
// })
// //to view data in the db
// app.get('/view',async(req,res)=>{
//     try {
//         const data = await user.find()
//         res.send(data)
//     } catch (error) {
//         console.log(error)
//     }
// })
// //to delete the data from database
 app.delete('/remove/:id' ,async(req,res)=>{
  try {
       var data = await student.findByIdAndDelete(req.params.id)
        res.send({message:"deleted"})
    } catch (error) {
        console.log(error)
   }
 })
// //to updatethe data from database
app.put('/edit/:id',async(req,res)=>{
   try {
         var data = await student.findByIdAndUpdate(req.params.id,req.body);
        res.send({message:"updated",data})

     } catch (error) {
         console.log(error)
    }
 })

// 4.port allocation
app.listen(3001,()=>{
    console.log("port is up and running")
})