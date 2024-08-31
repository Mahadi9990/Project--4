
import express from 'express'
import {singup,singin} from '../contorolar/contorer.js'

const route=express.Router()


route.post('/sing-up',singup)
route.post('/sing-in',singin)


export default route;