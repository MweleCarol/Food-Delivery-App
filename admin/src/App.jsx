import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import {Route, Routes} from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer } from 'react-toastify';

const App = () => {


  const backendUrl = "http://localhost:4000";

  return (
    <div>
      <ToastContainer></ToastContainer>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />

        <Routes>
          <Route path='/add' element={<Add backendUrl={backendUrl}/>}></Route>
          <Route path='/list' element={<List backendUrl={backendUrl}/>}></Route>
          <Route path='/orders' element={<Orders backendUrl={backendUrl}/>}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
