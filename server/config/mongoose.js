const mongoose = require('mongoose');

//making connection to local database
mongoose.connect(process.env.MONGO_URL);

//Setting database to db
const db = mongoose.connection;

//on error
db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

//on connection
db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
}); 

module.exports = db; 