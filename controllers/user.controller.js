import User from '../models/user.model.js'

export const getAllUsers=async(req,res)=>{
    const users = await User.find()
    const usersWithoutPassword = users.map(user=>{
        return {
            ...user._doc,
            password:undefined
        }
    })
    res.status(200)
    .send({
        message: "all users",
      users: usersWithoutPassword
    })
}

export const getOneUser=async (req, res)=>{
    const id = req.params.id;
    const user = await User.findById(id)
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

export const getUserProfile =async (req, res)=>{
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
