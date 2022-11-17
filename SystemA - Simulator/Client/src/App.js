// import React, {useEffect, useState} from 'react'

import Navbar from './Navbar'
import About from './pages/About'
import Home from './pages/Home'
import {Route,Routes} from "react-router-dom"
import Simulator from './pages/Simulator'


function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/simulator" element={<Simulator/>}/>
          <Route path="/about" element={<About/>}/>
        </Routes>
      </div>
      
    </>
  )
}

export default App