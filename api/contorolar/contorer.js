
import {errorHandler} from '../utils/error.js'
import bcryptjs from 'bcryptjs'
import User from '../model/userModel.js'
import jwt from 'jsonwebtoken'

export const singup =async(req,res,next)=>{
    const {userName,email,password} =req.body
    if(!userName || !email || !password || userName ==="" || email ==="" || password ===""){
        return next(errorHandler(200,'Fill up all required fields'))
    }
    const hashPassword =bcryptjs.hashSync(password,10)
    const newUser =new User({
        userName,email,password:hashPassword
    })

    try {
        await newUser.save()
        res.status(200).json('user create successfully')
    } catch (error) {
        next(error)
    }
}

export const singin =async(req,res,next)=>{
    const {email,password} =req.body
    if(!email || !password || email === "" || password === ""){
        return next(errorHandler(401,"please fill up all fields"))
    }

    const validUser =await User.findOne({email})

    if(!validUser){
        return next(errorHandler(402,'Wrong cradialtals'))
    }

    const validPass = bcryptjs.compareSync(password,validUser.password)

    if(!validPass){
        return next(errorHandler(402,"Wrong cradialtals"))
    }

    const {password:pass,...rest} =validUser._doc

    const token =jwt.sign({id:validUser._id},process.env.JWTOKEN)

    res
    .status(200)
    .cookie("access_token",token,{httpOnly:true})
    .json(rest)
}



export const google = async (req, res, next) => {
    const {email,name,image} =req.body
    try {
        const user =await User.findOne({email})
        if(user){
            const token =jwt.sign({id:user._id},process.env.JWTOKEN)
            const {password:pass,...rest} =user._doc
            res.cookie('access_token',token,{httpOnly:true})
            .status(200)
            .json(rest)
        }else{
            const generatePassword =Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8)
            const hashPassword =bcryptjs.hashSync(generatePassword,10)
            const newUser =new User({
                userName:name.toLowerCase().split(" ").join("") + Math.random().toString(9).slice(-4),
                email:email,
                password:hashPassword,
                avater:image

            })
            await newUser.save()
            const {password:pass,...rest} =newUser._doc
            const token =jwt.sign({id:newUser._id},process.env.JWTOKEN)
            res.cookie("access_token",token,{httpOnly:true})
            .status(200)
            .json(rest)
        }
    } catch (error) {
        next(error)
    }
}

// export const update =async(req,res,next)=>{
//     if(req.user.id !== req.params.userId){
//         return next(errorHandler(401,'You are not allowed to update this user'))
//     }
//     if(req.body.password){
//         if(req.body.password < 6){
//             return next(errorHandler(402,"password need Bigger then 6 character"))
//         }
//         req.body.password =bcryptjs.hashSync(req.body.password,10)
//     }
//     if(req.body.userName){
//         if(req.body.userName.length < 5 || req.body.userName.length > 20){
//             return next(errorHandler(402,"User name is less then 5 words and getter then 20 words"))
//         }
//         if(req.body.userName.includes(' ')){
//             return next(errorHandler(402,"Space in not allow in userName"))
//         }
//         if(req.body.userName  !== req.body.userName.toLowerCase()){
//             return next(errorHandler(402,"userName must be lowercase"))
//         }
//         if(!req.body.userName.match(/^[a-zA-Z0-9]+$/)){
//             return next(errorHandler(402,"userName must be lowercase"))
//         }
//     }
//         try {
//             const updateUser =await User.findByIdAndUpdate(req.params.userId,
//                 {
//                     $set: {
//                         userName: req.body.userName,
//                         email: req.body.email,
//                         password: req.body.password,
//                         avater:req.body.avater
//                     },
//                 },
//                 { new: true }
            
//             )
//             const {password:pass,...rest} =updateUser._doc
//             res.status(200).json(rest)
//         } catch (error) {
//             next(error)
//         }
    
// }

export const update =async(req,res,next)=>{
    if(req.user.id !== req.params.userId){
        return next(errorHandler(401,"You are not allow to update this account"))
    }
    if(req.body.password){
        if(req.body.password < 5){
            return next(errorHandler(401,"Password need geter then 5 charecter"))
            req.body.password =bcryptjs.hashSync(req.body.password,10)
        }
    }
    if(req.body.userName){

            if( req.body.userName.length < 5 || req.body.userName.length > 20){
                       return next(errorHandler(402,"user name is less than 5 word and getter than 20 words"))
            }

            if( req.body.userName !== req.body.userName.toLowerCase()){
                return next(errorHandler(402,"user name must be lowercase"))

            }

            if(req.body.userName.includes(" ")){
                return next(errorHandler(401,"Space in not allow in userName"))
            }

            if(!req.body.userName.match(/^[a-zA-Z0-9]+$/)){
                return next(errorHandler(402,"userName must be text or number"))
            }
    }
    try {
        const updateUser =await User.findByIdAndUpdate(req.params.userId,{
            $set:{
                userName:req.body.userName,
                email:req.body.email,
                password:req.body.password,
                avater:req.body.avater
            }
        },{new:true})
        const {password:pass,...rest} =updateUser._doc
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }

}