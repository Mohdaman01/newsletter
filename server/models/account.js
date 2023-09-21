const mongoose  = require('mongoose');

const accountSchema = mongoose.Schema({
    name : {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    loginTokken: {
        type: String,
        required: true, 
    },

    picture: {
        type: String,
    }

},{
    timestamps: true,
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;