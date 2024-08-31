import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import Outh from '../components/Outh';



export default function Singup() {
  
  const [formData, setformData] = useState({});
  const [errorMessage, seterrorMessage] = useState(null);
  const [loading, setloading] = useState(false);
  const navigate =useNavigate()

  const handelClick = (e) => {
    setformData({...formData,[e.target.id]:e.target.value.trim()})
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.userName || !formData.email || !formData.password) {
      return seterrorMessage("Please fill up add inputs")
    }
    try {
      setloading(true)
      seterrorMessage(null)
      const res = await fetch('/api/user/sing-up', {
        method: "POST",
        headers: {
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      })

      const data = await res.json()
      
      if (data.success === false) {
        seterrorMessage(data.message)
        setloading(false)
        return
      }
      setloading(false)
      navigate('/sing-in')
      
    } catch (error) {
      seterrorMessage(error.message)
      setloading(false)
    }
  }
  
  return (
    <div className='sm:flex-row flex flex-col justify-between items-center gap-4 p-4 min-h-[500px]'>
      <div className="mx-auto">
        <h1 className='text-3xl text-pink-500 font-bold'>welcome to sing up page</h1>
        <p className='mt-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit<br /> quaerat veniam obcaecati distinctio neque numquam!</p>
      </div>
      <div className="w-[600px] flex flex-col justify-center items-center gap-3">
        <h1 className='text-3xl text-pink-500 font-bold'>Sing up</h1>

        <form onSubmit={handleSubmit} className='w-full pr-5'>
          <div className="">
            <Label>Your name</Label>
            <TextInput
              id='userName'
              placeholder='userName'
              type='text'
              onChange={handelClick}
            />
          </div>
          <div className="">
            <Label>Your Eamil</Label>
            <TextInput
              id='email'
              placeholder='name@company.com'
              type='email'
              onChange={handelClick}
            />
          </div>
          <div className="">
            <Label>Password</Label>
            <TextInput
              id='password'
              placeholder='************'
              type='password'
              onChange={handelClick}
            />
          </div>
          <Button type='submit' disabled={loading} gradientDuoTone='purpleToPink' className='mt-3 w-full'>
            {loading?<>
            <Spinner size="sm" /><span className='pl-2'>Loading...</span>
            </>:"Sing Up"}
            </Button>
            <Outh/>
            <p className='mt-2'>Have a account<span className='text-blue-500 hover:underline pl-3 font-semibold'><Link to='/sing-in'>sing in</Link></span></p>
        </form>
        
        {errorMessage && (
          <Alert className='w-full' color='failure'>{errorMessage}</Alert>
        )}
      </div>
    </div>
  )
}
