import { Route, Routes } from 'react-router-dom'
import Home from './components/home/Home.jsx'
import Login from './components/login/Login.jsx'
import Header from './components/header/Header.jsx'
import Footer from './components/footer/Footer.jsx'
import Register from './components/register/Register.jsx'
import Logout from './components/logout/Logout.jsx'
import BootsCreate from './components/boots-create/BootsCreate.jsx'
import Catalog from './components/catalog/Catalog.jsx'
import BootsEdit from './components/boots-edit/BootsEdit.jsx'
import BootsDetails from './components/boots-details/BootsDetails.jsx'
import ProtectedRoute from './components/ProtectedRoutes.jsx'
import Terrains from './components/terrains/Terrains.jsx'
import Profile from './components/profile/Profile.jsx'

function App() {

  return (
    <>
      <Header />

        <Routes >
          <Route path='/' element={< Home />} />
          <Route path='/boots' element={< Catalog />} />
          <Route path='/boots/details/:bootsId' element={< BootsDetails />} />
          <Route path='/terrains' element={< Terrains />} />

          <Route element={<ProtectedRoute />}>
            <Route path='/boots/create' element={< BootsCreate />} />
            <Route path='/boots/edit/:bootsId' element={< BootsEdit />} />
            <Route path='/logout' element={< Logout />} />
          </Route>
          
          <Route path='/register' element={< Register />} />
          <Route path='/login' element={< Login />} />
          <Route path='/profile' element={< Profile />} />
        </Routes>
      
      <Footer />
    </>
  )
}

export default App
