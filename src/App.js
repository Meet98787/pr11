// src/App.js
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'

import axios from 'axios'

import Product from './components/Product'
import Signup from './components/Signup'
import Login from './components/Login'
import Cart from './components/Cart'
import AuthContext from './components/authContext'
import ProtectedRoute from './components/ProtectedRoute'
import GuestRoute from './components/GuestRoute'
import Home from './components/Home'

const App = () => {
  const [authenticate, setIsAuthenticate] = useState(null)

  useEffect(() => {
      axios.get('http://localhost:3100/current-user')
          .then((res) => {
              if (Object.keys(res.data).length < 1) {
                  setIsAuthenticate(null)
              } else {
                  setIsAuthenticate(res.data)
              }
          })
  }, [])

  return (

      <>
          <BrowserRouter>
              <AuthContext.Provider value={{ authenticate, setIsAuthenticate }}>
                  <Header />
                  <Routes>
                      <Route path='/' element={<Home />} />
                      <Route path='/login' element={<GuestRoute Cmp={<Login />} />} />
                      <Route path='/signup' element={<GuestRoute Cmp={<Signup />} />} />
                      <Route path='/product' element={<ProtectedRoute Cmp={<Product/>} />} />
                      <Route path='/cart' element={<ProtectedRoute Cmp={<Cart />} />} />
                  </Routes>
              </AuthContext.Provider>
          </BrowserRouter>
      </>
  )
};

export default App;
