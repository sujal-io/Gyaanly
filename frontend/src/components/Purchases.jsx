import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaDiscourse, FaDownload } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { RiHome2Fill } from "react-icons/ri";
import { HiMenu, HiX } from "react-icons/hi"; // Icons for sidebar toggle
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../utils/utils";

function Purchases() {
  const [purchases, setPurchase] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar open state

  const navigate = useNavigate();
  const token = (() => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return null;
      // We saved JSON.stringify(token) on login
      return JSON.parse(raw);
    } catch {
      return null;
    }
  })();

  console.log("purchases: ", purchases);

  // Token handling
  useEffect(() => {
    setIsLoggedIn(!!token);
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // Fetch purchases
  useEffect(() => {
    const fetchPurchases = async () => {
      if (!token) return;
      try {
        const response = await axios.get(
          `${BACKEND_URL}/user/purchased`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        const data = response?.data;
        console.log('purchases api data:', data)
        setPurchase(
          data?.courseData || data?.purchases || data?.purchased || data?.data || []
        );
      } catch (error) {
        setErrorMessage(
          error?.response?.data?.errors || "Failed to fetch purchase data"
        );
      }
    };
    fetchPurchases();
  }, [token]);

  // Logout
  const handleLogout = async () => {
    try {
      await axios.get(`${BACKEND_URL}/user/logout`, {
        withCredentials: true,
      });
      toast.success("Logout successful");
    } catch (error) {
      console.log("Error in logging out ", error);
      toast.error(
        error?.response?.data?.errors || error?.message || "Error in logging out (server)"
      );
    }
    // Client-side cleanup regardless of server response
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Normalize purchases to a display-friendly array of course-like objects
  const displayPurchases = Array.isArray(purchases)
    ? purchases.map((p) => {
        // common shapes: { course: {...} } or direct course object or { courseId: {...} }
        const courseObj = p?.course || p?.courseId || p;
        return {
          _id: courseObj?._id || p?._id,
          title: courseObj?.title || p?.title || 'Untitled',
          description: courseObj?.description || p?.description || '',
          price: courseObj?.price || p?.price || '',
          image: courseObj?.image || p?.image || {},
        };
      })
    : [];

  return (
    <div className="flex min-h-screen overflow-x-hidden">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-gray-100 p-5 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out w-64 z-50`}
      >
        <div className="flex items-center mb-10 mt-10 md:mt-0">
          <img src="/logo.png" alt="Profile" className="rounded-full h-12 w-12" />
        </div>
        <nav>
          <ul className="mt-16 md:mt-0">
            <li className="mb-4">
              <Link to="/" className="flex items-center">
                <RiHome2Fill className="mr-2" /> Home
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/courses" className="flex items-center">
                <FaDiscourse className="mr-2" /> Courses
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/purchases" className="flex items-center text-blue-500">
                <FaDownload className="mr-2" /> Purchases
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/settings" className="flex items-center">
                <IoMdSettings className="mr-2" /> Settings
              </Link>
            </li>
            <li>
              {isLoggedIn ? (
                <button type="button" onClick={handleLogout} className="flex items-center">
                  <IoLogOut className="mr-2" /> Logout
                </button>
              ) : (
                <Link to="/login" className="flex items-center">
                  <IoLogIn className="mr-2" /> Login
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>

      {/* Sidebar Toggle Button (Mobile) */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-blue-600 text-white p-2 rounded-lg"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <HiX className="text-2xl" />
        ) : (
          <HiMenu className="text-2xl" />
        )}
      </button>

      {/* Main Content */}
      <div
        className={`flex-1 p-8 bg-gray-50 min-h-screen w-full transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } md:ml-64`}
      >
        <h2 className="text-xl font-semibold mt-6 md:mt-0 mb-6">
          My Purchases
        </h2>

        {/* Error message */}
        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}

        {/* Render purchases */}
        {displayPurchases.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayPurchases.map((purchase, index) => (
              <div
                key={index}
                className="bg-linear-to-r from-[#2C3E50] to-[#4CA1AF] rounded-lg overflow-hidden shadow-md p-6 mb-6"
              >
                <div className="flex flex-col items-center space-y-4">
                  {/* Course Image */}
                  <img
                    className="rounded-lg w-full h-48 object-contain"
                    src={
                      purchase.image?.url || "https://via.placeholder.com/200"
                    }
                    alt={purchase.title}
                  />
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-white">{purchase.title}</h3>
                    <p className="text-[#F0EDCC]">
                      {purchase?.description?.length > 100
                        ? `${purchase.description.slice(0, 100)}...`
                        : (purchase?.description || '')}
                    </p>
                    <span className="text-black font-semibold text-sm">
                      {purchase.price ? `₹${purchase.price} only` : ''}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You have no purchases yet.</p>
        )}
      </div>
    </div>
  );
}

export default Purchases;