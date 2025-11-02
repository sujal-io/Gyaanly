import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { BACKEND_URL } from "../../utils/utils";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/user/login`, {
        email,
        password,
      },{
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Login successful",response.data);
      toast.success(response.data.message);
      localStorage.setItem("user", JSON.stringify(response.data.token));
      navigate("/");
    } catch (error) {
      if (error.response) {
        const data = error.response.data;
        const message = data?.message || (Array.isArray(data?.errors) ? data.errors.join("\n") : "Login failed");
        setErrorMessage(message);
      } else {
        const fallback = error?.message || "Network error. Please try again.";
        setErrorMessage(fallback);
        alert(fallback);
      }
    }
  };

  return (
     <div className="bg-gray-750 ">
      <div className="h-screen container mx-auto flex  items-center justify-center text-white">
        {/* Header */}
        <header className="absolute top-0 left-0 w-full flex justify-between items-center p-5  ">
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="Logo" className="w-10 h-10 rounded-full" />
            <Link to={"/"} className="text-xl font-bold text-white">
              Gyaanly
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to={"/signup"}
              className="bg-linear-to-r from-[#16222A] to-[#3A6073]  p-1 text-md md:text-md md:py-3 md:px-5 rounded-md  font-semibold hover:border-none"
            >
              Signup
            </Link>
            <Link
              to={"/courses"}
              className="bg-linear-to-r from-[#16222A] to-[#3A6073]  p-1 text-md md:text-md md:py-3 md:px-5 rounded-md  font-semibold hover:border-none"
            >
              Join now
            </Link>
          </div>
        </header>

        {/* Login Form */}
        <div className="bg-linear-to-r from-[#000046] to-[#1CB5E0] p-8 rounded-lg shadow-lg w-[500px] m-8 md:m-0 mt-20">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Welcome to <span className="text-white">Gyaanly</span>
          </h2>
          <p className="text-center text-gray-400 mb-6">
            Login to get access to our paid content !
          </p>

          <form onSubmit={handleSubmit}>

            <div className="mb-4">
              <label htmlFor="email" className=" text-gray-400 mb-2">
                Email
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="name@email.com"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className=" text-gray-400 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="********"
                  required
                />
                <span className="absolute right-3 top-3 text-gray-500 cursor-pointer">
                  👁️
                </span>
              </div>
            </div>
            {errorMessage && (
              <div className="mb-4 text-red-500 text-center">
                {errorMessage}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-linear-to-r from-[#EB3349] to-[#F45C43] text-white py-3 px-6 rounded-md transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login