const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 7070;
require('dotenv').config();

const allRoute = require('./router');
const  mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL)
.then(()=>{console.log("Mongodb Connected")})
.catch(()=>{console.log("MongoDb Not Connected")})

const app = express()
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send('MF Automation')
})

app.use('/api',allRoute)

app.listen(PORT,()=>{console.log("Server running on:",PORT)})