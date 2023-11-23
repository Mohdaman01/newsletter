const express = require('express');
const app  = express();

const dotenv= require('dotenv');
dotenv.config();

const cors = require('cors');
app.use(cors()); 

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));



const db = require('./config/mongoose');

const port= 5000;

app.use('/', require('./routes/index'));

app.listen(port, (err)=>{
    if(err){

        return console.log(err);

    }
    
    console.log(`sever is running on port http://localhost:${port}`);

})

