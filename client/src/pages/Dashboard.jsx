import { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom'
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashUser from '../components/DashUser';
import DashComment from '../components/DashComment';
import DashPost from '../components/DashPost';

export default function Dashboard() {
  const [tab, settab] = useState('');
  const location =useLocation()
  useEffect(() => {
      const urlParams =new URLSearchParams(location.search)
      const serachParames = urlParams.get('tab')
      if(serachParames){
        settab(serachParames)
      }
  }, [location.search]);
  return (
    <div className='md:flex gap-2 items-start flex-row w-full'>
      {/* Dashsidebar  */}
      <DashSidebar/>
      {/* Profile Area */}
      {
        tab === 'profile'&& <DashProfile/>
      }
      {
        tab === 'user'&& <DashUser/>
      }
      {
        tab === 'post'&& <DashPost/>
      }
      {
        tab === 'comment'&& <DashComment/>
      }
      
    </div>
  )
}
