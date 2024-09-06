
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
            const token =jwt.sing({id:user._id},process.env.JWTOKEN)
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