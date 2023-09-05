const User = require("../models/userModel")

//  log-in controller
const loginUser = async (req,res) => {
    res.json({msg: "login user"})
}



//  sign-up controller
const signUpUser = async (req,res) => {
    const {email, password} = req.body;

    try {
        const user = await User.signup(email, password)

        res.status(200).json({email, user})

    } catch(error) {
        res.status(400).json({error: error.message})
    }

}



module.exports = {loginUser, signUpUser}