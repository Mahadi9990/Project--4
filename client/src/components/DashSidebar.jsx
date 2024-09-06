import {Sidebar} from 'flowbite-react'
import { useEffect, useState } from 'react';
import { HiUser, HiArrowSmRight, HiOutlinePresentationChartBar, HiDocumentRemove, HiSupport } from 'react-icons/hi'
import {Link, useLocation} from 'react-router-dom'
export default function DashSidebar() {
  const [tab, settab] = useState('');
  const location =useLocation()
  useEffect(() => {
      const urlParams =new URLSearchParams(location.search)
      const serachParams = urlParams.get('tab')
      if(serachParams){
        settab(serachParams)
      }
  }, [location.search]);
  return (
    <Sidebar className='p-2'>
      <Sidebar.Items>
        <Sidebar.ItemGroup className='w-full md:w-56'>
          <Link to={'/dashboard?tab=profile'}>
          <Sidebar.Item className='my-2' active={ tab === 'profile'} label={'User'} labelColor='dark'icon={HiSupport}>
            Profile
          </Sidebar.Item>
          </Link>

          <Link to={'/dashboard?tab=post'}>
          <Sidebar.Item className='my-2' active={ tab === 'post'}  icon={HiOutlinePresentationChartBar}>
            Post
          </Sidebar.Item>
          </Link>
          <Link to={'/dashboard?tab=comment'}>
            <Sidebar.Item className='my-2' active={ tab === 'comment'}  icon={HiDocumentRemove}>
              comment
            </Sidebar.Item>
          </Link>
          <Link to={'/dashboard?tab=user'}>
          <Sidebar.Item className='my-2' active={ tab === 'user'} icon={HiUser}>
            User
          </Sidebar.Item>
          </Link>
          <Sidebar.Item icon={HiArrowSmRight}>
            Sing Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
