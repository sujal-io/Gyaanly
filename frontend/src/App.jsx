import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Signup from './components/Signup'  
import Login from './components/Login'
import { Toaster } from 'react-hot-toast';
import Courses from './components/Courses'
import Purchases from './components/Purchases'
import Buy from './components/Buy'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />

        <Route path="/courses" element={<Courses/>} />
        <Route path="/purchases" element={<Purchases/>} />
        <Route path="/buy/:courseId" element={<Buy/>} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App