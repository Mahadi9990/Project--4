import {Sidebar} from 'flowbite-react'
import { useEffect, useState } from 'react';
import { HiUser, HiArrowSmRight, HiOutlinePresentationChartBar, HiDocumentRemove, HiSupport } from 'react-icons/hi'
import {Link, useLocation} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { 
  
  singoutUserSuccess,
  singoutUserFailuar
} from '../redux/user/userSlice.js';
export default function DashSidebar() {
  const dispatch =useDispatch()
  const [tab, settab] = useState('');
  const location =useLocation()
  useEffect(() => {
      const urlParams =new URLSearchParams(location.search)
      const serachParams = urlParams.get('tab')
      if(serachParams){
        settab(serachParams)
      }
  }, [location.search]);
  
const userSingout = async () => {
  try {
    const res = await fetch(`/api/user/singout`, {
      method:'POST'
    })
    const data = await res.json()
    if (!res.ok) {
      dispatch(singoutUserFailuar(data.message))
    } else {
      dispatch(singoutUserSuccess(data))
    }
  } catch (error) {
    dispatch(singoutUserFailuar(error.message))
  }
}
  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup >
          <Link to={'/dashboard?tab=profile'}>
          <Sidebar.Item as='div' className='my-2' active={ tab === 'profile'} label={'User'} labelColor='dark'icon={HiSupport}>
            Profile
          </Sidebar.Item>
          </Link>

          <Link to={'/dashboard?tab=post'}>
          <Sidebar.Item as='div' className='my-2' active={ tab === 'post'}  icon={HiOutlinePresentationChartBar}>
            Post
          </Sidebar.Item>
          </Link>
          <Link to={'/dashboard?tab=comment'}>
            <Sidebar.Item as='div' className='my-2' active={ tab === 'comment'}  icon={HiDocumentRemove}>
              comment
            </Sidebar.Item>
          </Link>
          <Link to={'/dashboard?tab=user'}>
          <Sidebar.Item as='div' className='my-2' active={ tab === 'user'} icon={HiUser}>
            User
          </Sidebar.Item>
          </Link>
          <Sidebar.Item onClick={userSingout} icon={HiArrowSmRight}>
            Sing Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
