
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