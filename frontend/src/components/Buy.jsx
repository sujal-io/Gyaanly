import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { HiX, HiMenu } from 'react-icons/hi'
import { RiHome2Fill } from 'react-icons/ri'
import { FaDiscourse } from 'react-icons/fa'
import { FaDownload, FaCircleUser } from 'react-icons/fa6'
import { IoMdSettings } from 'react-icons/io'
import { IoLogOut, IoLogIn } from 'react-icons/io5'
import { BACKEND_URL } from '../../utils/utils'

function Buy() {
    const{courseId}=useParams() // useParams() is a hook that returns an object of the URL parameters
    const[loading,setLoading]=useState(false) //loading is a state variable that is used to track the loading state of the component
    const navigate = useNavigate()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [course, setCourse] = useState(null)
    const [courseLoading, setCourseLoading] = useState(true)

    const token = (() => {
        try {
            const raw = localStorage.getItem('user')
            if (!raw) return null
            // In Login.jsx we saved JSON.stringify(response.data.token), so raw is a JSON string of the token
            return JSON.parse(raw)
        } catch {
            return null
        }
    })()

    React.useEffect(() => {
        const hasToken = !!localStorage.getItem('user')
        setIsLoggedIn(hasToken)
    }, [])

    React.useEffect(() => {
        const fetchCourse = async () => {
            try {
                setCourseLoading(true)
                const res = await axios.get(`${BACKEND_URL}/course/courses`, {
                    withCredentials: true,
                })
                const list = res?.data?.courses || []
                const found = list.find(c => c._id === courseId)
                setCourse(found || null)
            } catch (e) {
                console.error('Error fetching course list:', e)
            } finally {
                setCourseLoading(false)
            }
        }
        fetchCourse()
    }, [courseId])

    const handlePurchase=async()=>{
        if(!token){
            toast.error('Please login to purchase the course')
            return
        }
        try{
            setLoading(true)
            const response = await axios.post(`${BACKEND_URL}/course/buy/${courseId}`,{},
            {
                headers:{
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true,
            })
            toast.success(response.data.message ||'Course purchased successfully')
            navigate('/purchases')
            setLoading(false)
        } catch(error){
            console.log(error)
            setLoading(false)
            if(error.response?.status===400){
                toast.error("You have already purchased the course")
                navigate('/purchases')
            }else{
                toast.error(error?.response?.data?.errors || 'Something went wrong')
            }
        }
     }

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <div className="flex">
      <button
        className="md:hidden fixed top-4 left-4 z-20 text-3xl text-gray-800"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <HiX /> : <HiMenu />}
      </button>

      <aside
        className={`fixed top-0 left-0 h-screen bg-gray-100 w-64 p-5 transform z-10 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static`}
      >
        <div className="flex items-center mb-10 mt-10 md:mt-0">
          <img src="/logo.png" alt="Profile" className="rounded-full h-12 w-12" />
        </div>
        <nav>
          <ul>
            <li className="mb-4">
              <a href="/" className="flex items-center">
                <RiHome2Fill className="mr-2" /> Home
              </a>
            </li>
            <li className="mb-4">
              <a href="/courses" className="flex items-center">
                <FaDiscourse className="mr-2" /> Courses
              </a>
            </li>
            <li className="mb-4">
              <a href="/purchases" className="flex items-center">
                <FaDownload className="mr-2" /> Purchases
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="flex items-center">
                <IoMdSettings className="mr-2" /> Settings
              </a>
            </li>
            <li>
              {isLoggedIn ? (
                <a href="/" className="flex items-center" onClick={(e)=>{e.preventDefault(); localStorage.removeItem('user'); setIsLoggedIn(false); navigate('/')}}>
                  <IoLogOut className="mr-2" /> Logout
                </a>
              ) : (
                <a href="/login" className="flex items-center">
                  <IoLogIn className="mr-2" /> Login
                </a>
              )}
            </li>
          </ul>
        </nav>
      </aside>

      <main className="ml-0 md:ml-64 w-full bg-white p-10">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-xl font-bold">Buy Course</h1>
          <div className="flex items-center space-x-3">
            <FaCircleUser className="text-4xl text-blue-600" />
          </div>
        </header>

        {courseLoading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : !course ? (
          <p className="text-center text-gray-500">Course not found</p>
        ) : (
          <div className="max-w-xl mx-auto border border-gray-200 rounded-lg p-4 shadow-sm bg-linear-to-r from-[#2C3E50] to-[#4CA1AF]">
            <img
              src={course.image?.url}
              alt={course.title}
              className="rounded mb-4 w-full h-48 object-contain mx-auto"
            />
            <h2 className="font-bold text-lg mb-2 text-white text-center">{course.title}</h2>
            <p className="text-[#F0EDCC] mb-4 text-center">
              {course.description?.length > 140 ? `${course.description.slice(0,140)}...` : course.description}
            </p>
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-xl text-amber-200">
                ₹{course.price} <span className="text-gray-800 line-through">5999</span>
              </span>
              <span className="text-red-700 font-semibold">20% off</span>
            </div>
            <button
              className='bg-orange-500 w-full text-white px-4 py-2 rounded-lg hover:bg-blue-900 duration-300'
              onClick={handlePurchase} disabled={loading}
            >
              {loading ? 'Processing...' : 'Buy Now'}
            </button>
            {/* disabled={loading} will disable the button when loading is true mtlb button will not be clickable */}
          </div>
        )}
      </main>
    </div>
  )
}

export default Buy