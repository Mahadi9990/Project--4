import {Button, Navbar, TextInput} from 'flowbite-react'
import { Link ,useLocation} from 'react-router-dom'
import { FaSearch } from "react-icons/fa";
import { FaMoon } from "react-icons/fa6";




export default function Header() {
    const path =useLocation().pathname
  return (
    <Navbar className='flex flex-row gap-2'>
        <Link to='/' className='
            rounded-lg 
            bg-gradient-to-l
         from-indigo-500
         via-purple-500
         to-pink-500
         text-white
           text-3xl
           font-bold
           py-2 pl-2
              '>
            Shafayat <span className='ml-1 text-black dark:text-white bg-gray-100 py-4'>blog</span>
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
            <Button color='gray' pill className='w-12 h-10'><FaMoon/></Button>
            <Link to='/sing-in'><Button gradientDuoTone='purpleToBlue' outline>Sing in</Button></Link>
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
