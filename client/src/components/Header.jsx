import {Avatar, Button, Dropdown, Navbar, TextInput} from 'flowbite-react'
import { Link ,useLocation} from 'react-router-dom'
import { FaSearch, FaSun  } from "react-icons/fa";
import { FaMoon } from "react-icons/fa6";
import { useSelector,useDispatch } from 'react-redux';
import { themeToggle } from '../redux/theme/ThemeSlice';
import { 
  
    singoutUserSuccess,
    singoutUserFailuar
  } from '../redux/user/userSlice.js';



export default function Header() {
    const dispatch =useDispatch()
    const {currentUser} =useSelector((state)=>state.user)
    const {theme} =useSelector((state)=>state.theme)
    const path =useLocation().pathname
    
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
    <Navbar className='flex flex-row gap-2'>
        <Link className='
          self-center whitespace-nowrap text-sm md:text-xl font-semibold dark:text-white
          '>
            <span className='py-1 px-2 rounded-lg text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 '>Shafayat</span>Blog
          </Link>
        <form>
            <TextInput
                placeholder='Search...'
                rightIcon={FaSearch}
                className='md:inline hidden'
            />
           <Link to='/search'> <Button color='gray' className='md:hidden inline'><FaSearch/></Button></Link>
        </form>
        <div className="flex justify-center items-center gap-2 md:order-2">
            <Button color='gray' pill className='w-12 h-10' onClick={()=>dispatch(themeToggle())}>
                {theme === 'light'?<FaMoon/>:<FaSun/>}
            </Button>
            {currentUser?(
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar
                            img={currentUser.avater}
                            rounded
                            size='sm'
                        />
                    }
                >
                    <Dropdown.Header>
                        <span>@{currentUser.userName}</span><br />
                        <span className='pt-2 truncate'>{currentUser.email}</span>
                    </Dropdown.Header>
                    <Link to='/dashboard?tab=profile'>
                        <Dropdown.Item>
                            Profile
                        </Dropdown.Item>
                    </Link>
                    <Dropdown.Item onClick={userSingout}>
                        Sing Out
                    </Dropdown.Item>
                </Dropdown>
            ):(
              <Link to='/sing-in'><Button gradientDuoTone='purpleToBlue' outline>Sing in</Button></Link>
            )}
            <Navbar.Toggle/>
        </div>
        <Navbar.Collapse>
            <Navbar.Link  active={path === '/'} as={'div'}>
                <Link to='/'>Home</Link>
            </Navbar.Link >
            <Navbar.Link active={path === '/about'} as={'div'}>
                <Link to='/about'>About</Link>
            </Navbar.Link >
            <Navbar.Link active={path === '/project'} as={'div'}>
                <Link to='/project' >Project</Link>
            </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
  )
}
