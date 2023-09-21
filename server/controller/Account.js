const Account = require('../models/account');

module.exports.createAccount = async (req, res) => {

    try {
        // console.log(req.body);
        const user = await Account.findOne({ email: req.body.email });
      
        if (!user) {
            Account.create(req.body);
            return res.status(200).json({
                message: "Account created!",
            })
        }else if(req.body.loginTokken !== user.loginTokken){

            await Account.findByIdAndUpdate(user._id,{loginTokken: req.body.loginTokken});
            console.log('account updated');
        }

        return res.status(200).json({
            message: "Account already exists!"
        })

    } catch (err) {
        console.log(err);
        return res.status(401).json({
            message: 'Internal Sever Error!'
        })
    }

}

module.exports.sentAccount = async (req,res) => {
    
    try{

        const user = await Account.findOne({loginTokken : req.body.loginTokken})

        if(user){
            return res.status(200).json({
                message: 'user Found',
                account: {
                    name: user.name,
                    email: user.email,
                    picture: user.picture
                }
            })
        }

        return res.status(200).json({
            message: 'user does not exist!'
        })

    }catch(err){

        console.log(err);
        return res.status(401).json({
            message: 'Internal Sever Error!'
        });

    }
}
