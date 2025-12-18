import { Route, Routes } from 'react-router-dom'
import Home from './components/home/Home.jsx'
import Login from './components/login/Login.jsx'
import Header from './components/header/Header.jsx'
import Footer from './components/footer/Footer.jsx'
import Register from './components/register/Register.jsx'
import Logout from './components/logout/Logout.jsx'
import BootsCreate from './components/boots-create/BootsCreate.jsx'
import Catalog from './components/catalog/Catalog.jsx'

function App() {

  return (
    <>

    <Header />

      <Routes >
        <Route path='/' element={< Home />} />
        <Route path='/create' element={< BootsCreate />} />
        <Route path='/catalog' element={< Catalog />} />
        <Route path='/register' element={< Register />} />
        <Route path='/login' element={< Login />} />
        <Route path='/logout' element={< Logout />} />
      </Routes>
    
    <Footer />
    </>
  )
}

export default App
