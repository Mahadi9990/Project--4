import { Alert, Button, TextInput } from "flowbite-react"
import { useState,useRef, useEffect } from "react";
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase.js'
export default function DashProfile() {
  const {currentUser} =useSelector((state)=>state.user)
  const [fromData, setfromData] = useState({});
  const [imageFile, setimageFile] = useState(null);
  const [imageFileUrl, setimageFileUrl] = useState(null);
  const [imgeFileUploadError, setimgeFileUploadError] = useState(null);
  const [imageUploadingProgress, setimageUploadingProgress] = useState(null);
  const [imageUploadSuccess, setimageUploadSuccess] =useState(null)
  const [imageUploading, setimageUploading] = useState(null);
  console.log(imageUploadingProgress)
  console.log(fromData)

  const filePickerRef =useRef()
  const handleChange =(e)=>{
    setfromData({...fromData,[e.target.id]:e.target.value})
  }
const handleImageChange =(e)=>{
  const file = e.target.files[0]
  if(file){
    setimageFile(file)
    setimageFileUrl(URL.createObjectURL(file))
  }
}
useEffect(() => {
  if(imageFile){
    uploadImage()
  }
}, [imageFile]);

const uploadImage =async()=>{
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')
  setimageUploading(true)
  setimgeFileUploadError(null)
  const storage =getStorage(app)
  const fileName = new Date().getTime() + imageFile.name
  const storageRef =ref(storage,fileName)
  const uploadTask =uploadBytesResumable(storageRef,imageFile)
  uploadTask.on('state_changed',
    (snapsort) => {
      setimgeFileUploadError(null)
      setimageUploadSuccess(null)
      const progress =(snapsort.bytesTransferred / snapsort.totalBytes)* 100
      setimageUploadingProgress(progress.toFixed(0))
  },
  (error)=>{
    setimgeFileUploadError("conn't upload Image file must be 2mb")
    setimageFile(null)
    setimageFileUrl(null)
    setimageUploadingProgress(null)
    setimageUploading(null)
  },
  ()=>{
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
      setimageFileUrl(downloadURL)
      setfromData({...fromData,avater:downloadURL})
      setimageUploadingProgress(null)
      setimageUploading(false)
    })
  }
)
}

  return (
    <div className='mx-auto p-2 mb-4'>
      <h1 className='text-center mb-4'>Profile</h1>
      <form className="flex flex-col gap-2 justify-center items-center w-[400px]">
        <input onChange={handleImageChange} type="file" accept="image/*" ref={filePickerRef} hidden/>
        <div className="" onClick={()=>filePickerRef.current.click()}>
          <img src={imageFileUrl || currentUser.avater} alt="" className="w-32 h-32 rounded-full"/>
        </div>
        {imgeFileUploadError && (
          <Alert color='failure' className="w-full">
            {imgeFileUploadError}
          </Alert>
        )}
        <TextInput
          id="userName"
          className="w-full"
          defaultValue={currentUser.userName}
          type="text"
          onChange={handleChange}
        />
        <TextInput
          id="email"
          className="w-full"
          defaultValue={currentUser.email}
          type="email"
          onChange={handleChange}

        />
        <TextInput
          id="password"
          className="w-full"
          placeholder="************"
          type="password"
          onChange={handleChange}
        />
        <Button type="submit" gradientDuoTone='purpleToPink' className="w-full">Update</Button>
        <Link to={'/create-post'} >
          <Button type='button' gradientDuoTone='purpleToBlue' outline className="w-[400px]">Create List</Button>
        </Link>
      </form>
        <div className="flex justify-between gap-2 mt-2">
        <span className="text-red-500 font-semibold">Delete</span>
        <span className="text-red-400 font-semibold">Sing Out</span>
        </div>
      
    </div>
  )
}
