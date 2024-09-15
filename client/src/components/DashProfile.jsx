

import {HiOutlineExclamationCircle} from 'react-icons/hi'
import {Alert, Button, Modal, TextInput} from 'flowbite-react'
import { useState ,useRef, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {getDownloadURL, getStorage, uploadBytesResumable,ref} from 'firebase/storage'
import {app} from '../firebase.js'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { 
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailuar 
} from '../redux/user/userSlice.js';

export default function DashProfile() {
  const fileRef =useRef()
  const {currentUser,loading} =useSelector((state)=>state.user)
  const [formData, setformData] = useState({});
  const [image, setimage] = useState(null);
  const [imageUrl, setimageUrl] = useState(null);
  const [imageUploading, setimageUploading] = useState(null);
  const [imageUploadingError, setimageUploadingError] = useState(null);
  const [imageUploadingProgress, setimageUploadingProgress] = useState(null);
  const [userUpdatSuccess, setuserUpdatSuccess] = useState(null);
  const [userUpdataError, setuserUpdataError] = useState(null);
  const [showModle, setshowModle] = useState(false);
  const dispatch =useDispatch()

  const handleImageChange =(e)=>{
      const file = e.target.files[0]
      if(file){
        setimage(file)
       setimageUrl(URL.createObjectURL(file))
      }
    }

  useEffect(() => {
    if(image){
      upoading()
    }
  }, [image]);
  const upoading =async()=>{
    setimageUploading(true)
    setimageUploadingError(null)
    const storage =getStorage(app)
    const fileName =new Date().getTime()+image.name
    const storageRef=ref(storage,fileName)
    const uploadTask=uploadBytesResumable(storageRef,image)
    uploadTask.on('state_changed',
      (snapshot)=>{
        setimageUploadingError(null)
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100
        setimageUploadingProgress(progress.toFixed(0))
      },(error)=>{
        setimageUploadingError("image upload less than 2mb")
        setimage(null)
        setimageUrl(null)
        setimageUploading(false)
        setimageUploadingProgress(null)
      },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
        setimageUrl(downloadURL)
        setformData({...formData,avater:downloadURL})
        setimageUploadingProgress(null)
        setimageUploading(false)
      })
    }

  
  )
  }

const handChamge =(e)=>{
  setformData({...formData,[e.target.id]:e.target.value})
}

const handleSubmit = async (e) => {
    e.preventDefault()
    setuserUpdataError(null)
    setuserUpdatSuccess(null)
    if (Object.keys(formData).length === 0) {
      setuserUpdataError('No change made')
      return
    }
    if (imageUploading) {
      setuserUpdataError('Please wait image for upload')
      return
    }
    try {
      dispatch(updateStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type':'application/json'
          },
          body:JSON.stringify(formData)
        })
      const data = await res.json()
      if (!res.ok) {
        dispatch(updateFailure(data.message))
        setuserUpdataError(data.message)
      } else {
        dispatch(updateSuccess(data))
        setuserUpdatSuccess("User update successfully")
      }
    } catch (error) {
      dispatch(updateFailure(error.message))
      setuserUpdataError(error.message)
    }
  }

  const handleDelete = async () => {
    // setshowModle(false)
    // try {
    //   dispatch(deleteUserStart())
    //   const res = await fetch(`/api/user/delete/${currentUser._id}`, {
    //     method:'delete'
    //   })
    //   const data = await res.json()
    //   if (!res.ok) {
    //     dispatch(deleteUserFailuar(data.message))
    //   } else {
    //     dispatch(deleteUserSuccess(data))
    //   }
    // } catch (error) {
    //   dispatch(deleteUserFailuar(error.message))
    // }
    setshowModle(false)
    try {
      dispatch(deleteUserStart())
      const res =await fetch(`/api/user/delete/${currentUser._id}`,{
        method:"DELETE"
      })
      const data =await res.json()
      if(!res.ok){
        dispatch(deleteUserFailuar(data.message))
      }else{
        dispatch(deleteUserSuccess(data))
      }
    } catch (error) {
      dispatch(deleteUserFailuar(error.message))
    }
}


  return (
    <div className='mx-auto'>
      <h2 className='p-3 text-center font-semibold'>Profile</h2>
      <form onSubmit={handleSubmit} className='flex justify-center items-center flex-col gap-3 w-[500px]'>
        <div className="w-32 h-32 relative">
        <input hidden onChange={handleImageChange} type="file" accept="image/*" ref={fileRef} />
        {imageUploadingProgress && (
            <CircularProgressbar
            value={imageUploadingProgress || 0}
            text={`${imageUploadingProgress}%`}
            strokeWidth={5}
            styles={{
              root: {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
              },
              path: {
                stroke:`rgba(62,152,199,${imageUploadingProgress /100})`
              }
            }}
          />
          )}
          <img
           onClick={()=>fileRef.current.click()} src={imageUrl ||currentUser.avater} alt="" 
           className={`border-8 w-32 h-32 rounded-full ${imageUploadingProgress && imageUploadingProgress < 100 && 'opacity-55'}`}/>
        </div>
        {imageUploadingError && (<Alert color='failure'>
          {imageUploadingError}
        </Alert>)}
        <TextInput
          id='userName'
          type='text'
          defaultValue={currentUser.userName}
          className='w-full'
          onChange={handChamge}
        />
        <TextInput
          id='email'
          type='email'
          defaultValue={currentUser.email}
          className='w-full'
          onChange={handChamge}
        />
        <TextInput
          id='password'
          type='password'
          placeholder='*************'
          className='w-full'
          onChange={handChamge}
        />
        <Button className='w-full' type='submit' gradientDuoTone="purpleToPink" disabled={loading || imageUploading}>
          {loading ? 'loading...':"Update"}
        </Button>
        {currentUser.isAdmin && (
          <Link to={'/create-post'} >
            <Button  className='w-[500px]' gradientDuoTone='purpleToBlue' outline>
              Create Post
            </Button>
          </Link>
        )}
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={()=>setshowModle(true)} className='text-red-400 font-semibold cursor-pointer'>Delete Account</span>
        <span className='text-red-700 font-semibold cursor-pointer'>Sing Out</span>
      </div>
      {userUpdataError && (<Alert className='my-2'color='failure'>
        {userUpdataError}
      </Alert>)}
      {userUpdatSuccess && (<Alert className='my-2'color='success'>
        {userUpdatSuccess}
      </Alert>)}
    <Modal show={showModle} onClose={()=>setshowModle(false)} size='md' popup>
        <Modal.Header/>
        <Modal.Body>
          <div className="text-center">
          <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto "/>
          <h3 className='text-gray-600 dark:text-gray-400 mb-5 text-lg font-semibold'>Are you sure want to delete your account</h3>
          <div className="flex justify-between gap-4">
            <Button onClick={handleDelete} gradientDuoTone='purpleToPink'>Yes i am sure</Button>
            <Button gradientDuoTone='purpleToBlue' outline onClick={()=>setshowModle(false)}>No,Cencle</Button>
          </div>
          </div>
        </Modal.Body>
    </Modal>
    </div>
  )
}
