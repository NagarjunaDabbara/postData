const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const port = process.env.PORT || 5000
mongoose.connect('mongodb://localhost/carShowRoom');

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

app.set('view engine','ejs')

const bikeShowRoom = mongoose.model('bikeCompany',{
    bike:String,
    color:String,
    bodyParts:String,
    fuel:String,
})

app.post('/postData',function(req,res){
    let bikeCompany= new bikeShowRoom({
        bike:'fz-s',
        color:'black',
        bodyParts:'plastic',
        fuel:'petrol'
    })
    bikeCompany.save().then(function(data){
        res.send(data)},function(e){
            res.send(e);
        })
})

const workerData=mongoose.model('WorkerData',{
   
    name:{type:String},
    age:Number,
    color:String,
    weight:Number,
    height:Number,
})

app.post('/postData/workerData',function(req,res){

    
const companyWorkerData= new workerData({
   name:"mosh",
    age:49,
    color:"black",
    weight:89,
    height:5.11
});

companyWorkerData.save().then(function(data){
    res.send(data)},function(e){
     res.send(err)
    }
)

}) 

app.get('/getData',function(req,res){
    workerData.findOne({_id:'5beaa0bb6a793628e4e2504b'}).then(function(data){
        res.send(data)},function(err){
            res.send(err)
        })
})

app.get('/',function(req,res){
    res.send('hello')
})
// -------------------------------------------------------------------------------
const carShowRoomschema =new mongoose.Schema({
  
    carName:String,
    color:String,
    wheels:Number,
    engine:Number,
    seats:Number,
    fuel:String,

})

const carShowRoom = mongoose.model('carCompany',carShowRoomschema)

const carCompany = new carShowRoom({
    carName:'bmw',
    color:"black",
    wheels:4,
    engine:1,
    seats:8,
    fuel:'petrol',
})
carCompany.save();

app.listen(port,function(){
    console.log('server started')
})