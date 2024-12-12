import User from '../models/user.model.js'

export const getAllUsers=async(req,res)=>{
    const users = await User.find()
    const usersWithoutPassword = users.map(user=>{
        user.password = null
    })
    res.status(200)
    .send({
        message: "all users",
        usersWithoutPassword
    })
}

export const getOneUser=async (req, res)=>{
    const {email} = req.body;
    const user = await User.findOne({email})
    res.status(200)
    .send({
        message:"user found",
        user:{
            user:{
                _id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email
            },
            password:null,
        }
    })
}
