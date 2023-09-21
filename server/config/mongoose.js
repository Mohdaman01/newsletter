const mongoose = require('mongoose');

//making connection to local database
mongoose.connect(`mongodb+srv://mohdastar200026:${process.env.mongoPass}@cluster0.cp66cca.mongodb.net/NewsApp`);

//Setting database to db
const db = mongoose.connection;

//on error
db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

//on connection
db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;