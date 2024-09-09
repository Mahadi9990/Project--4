import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Project from './pages/Project'
import About from './pages/About'
import SingIn from './pages/SingIn'
import Singup from './pages/Singup'
import Header from './components/Header'
import Fotter from './components/Fotter'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './pages/Dashboard'
import CreatPost from './pages/CreatPost'


export default function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route element={<PrivateRoute/>}>
        <Route path='/dashboard' element={<Dashboard/>}/>

      </Route>
      <Route path='/' element={<Home/>}/>
      <Route path='/project' element={<Project/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/sing-in' element={<SingIn/>}/>
      <Route path='/sing-up' element={<Singup/>}/>
      <Route path='/create-post' element={<CreatPost
      />}/>
    </Routes>
    <Fotter/>
    </BrowserRouter>
  )
}
