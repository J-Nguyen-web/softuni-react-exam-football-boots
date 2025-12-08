import { Route, Routes } from 'react-router-dom'
import Home from './components/home/Home.jsx'
import Login from './components/login/Login.jsx'

function App() {

  return (
    <>
      <Routes >
        <Route path='/' element={< Home />} />
        <Route path='/login' element={< Login />} />
      </Routes>
    </>
  )
}

export default App
