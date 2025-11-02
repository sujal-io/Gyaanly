import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { BACKEND_URL } from '../../utils/utils'

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const hasToken = !!localStorage.getItem('user')
    setIsLoggedIn(hasToken)

    const onStorage = (e) => {
      if (e.key === 'user') {
        setIsLoggedIn(!!e.newValue)
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const handleLogout = async () => {
    try {
      await axios.get(`${BACKEND_URL}/user/logout`, {
        withCredentials: true,
      })
      toast.success('Logout successful')
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || 'Logout failed (server)'
      toast.error(message)
    }
    // Client-side cleanup regardless of server result
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    navigate('/')
  }

  return (
    <>
    <div className='font-navbar text-white flex items-center justify-between p-6 container mx-auto'>
       <div className='flex items - center space-x-2'>
        <img src="/logo.png" alt="" className='w-10 h-10 rounded-full' />
        <h1 className='text-2xl font-bold'>Gyaanly</h1>
       </div>
       <div className='space-x-4'>
         {isLoggedIn ? (
          <button onClick={handleLogout} className="bg-linear-to-r from-[#FF416C] to-[#FF4B2B]  p-1 text-md md:text-md md:py-3 md:px-5 rounded-md  font-semibold hover:border-none">Logout</button>
         ) : (
          <>
          <Link to ={"/login"} className='bg-linear-to-r from-[#FF416C] to-[#FF4B2B] p-1 text-md md:text-md md:py-3 md:px-5 rounded-md font-semibold hover:border-none'>Login</Link>
          <Link to ={"/signup"} className='bg-linear-to-r from-[#16222A] to-[#3A6073]  p-1 text-md md:text-md md:py-3 md:px-5 rounded-md  font-semibold hover:border-none'>Signup</Link>
          </>
         )}
       </div>
    </div>
    </>
    
  )
}

export default Navbar