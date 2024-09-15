
import express from 'express'
import {singup,singin,google,update,deleteUser,singOut} from '../contorolar/contorer.js'
import {verifyToken} from '../utils/verifytoken.js'

const route=express.Router()


route.post('/sing-up',singup)
route.post('/sing-in',singin)
route.post('/google', google)
route.put('/update/:userId',verifyToken, update)
route.delete('/delete/:userId',verifyToken, deleteUser)
route.post('/singout', singOut)


export default route;