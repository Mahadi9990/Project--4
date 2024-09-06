import { Button } from 'flowbite-react'
import { FaGooglePlus } from "react-icons/fa";
import{getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase';
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {singInSuccess} from '../redux/user/userSlice'


export default function Outh() {
  const dispath =useDispatch()
  const naviagte =useNavigate()
  const handleGoogleClick =async()=>{
    const provider =new GoogleAuthProvider()
    const auth =getAuth(app)
    provider.setCustomParameters({prompt:"select_account"})
    try {
      const result =await signInWithPopup(auth,provider)
      const res = await fetch('/api/user/google',{
        method:'POST',
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          name:result.user.displayName,
          email:result.user.email,
          image:result.user.photoURL
        })
      })
      const data =await res.json()

      if(res.ok){
        dispath(singInSuccess(data))
        naviagte('/')
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <Button type='button' onClick={handleGoogleClick} gradientDuoTone='pinkToOrange' className='w-full mt-3' outline>
      <FaGooglePlus className='mr-2 w-6 h-6'/>
      Connect with google
    </Button>
  )
}

