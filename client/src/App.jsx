import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Project from './pages/Project'
import About from './pages/About'
import SingIn from './pages/SingIn'
import Singup from './pages/Singup'
import Header from './components/Header'


export default function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/project' element={<Project/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/sing-in' element={<SingIn/>}/>
      <Route path='/sing-up' element={<Singup/>}/>
    </Routes>
    </BrowserRouter>
  )
}
