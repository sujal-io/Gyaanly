import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";


function Footer() {
  return (
    <>
    <footer className="w-full font-footer border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="" className="w-10 h-10 rounded-full" />
              <h1 className="text-2xl text-white font-bold">Gyaanly</h1>
            </div>
            <div className="mt-4">
              <p className="mb-2 font-semibold text-lg text-[#F0EDCC]">Follow us</p>
              <div className="flex items-center gap-4">
                <a href="" aria-label="Facebook">
                  <FaFacebook className="text-3xl text-white hover:text-blue-400 duration-300" />
                </a>
                <a href="" aria-label="Instagram">
                  <FaInstagram className="text-3xl text-white hover:text-pink-600 duration-300" />
                </a>
                <a href="" aria-label="LinkedIn">
                  <FaLinkedin className="text-3xl text-white hover:text-blue-600 duration-300" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-lg font-semibold md:mb-4">Connect with us at</h3>
            <ul className="space-y-3 text-gray-400 mt-2 md:mt-0">
              <li className="flex items-center justify-center md:justify-start gap-x-3 text-[#F0EDCC] hover:text-white cursor-pointer duration-300">
                <a href="" aria-label="YouTube">
                  <FaYoutube className="text-2xl text-white hover:text-red-400 duration-300" />
                </a>
                <span>Youtube</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-x-3 text-[#F0EDCC] hover:text-white cursor-pointer duration-300">
                <a href="" aria-label="Telegram">
                  <FaTelegramPlane className="text-2xl text-white hover:text-blue-600 duration-300" />
                </a>
                <span>Telegram</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-x-3 text-[#F0EDCC] hover:text-white cursor-pointer duration-300">
                <a href="" aria-label="Github">
                  <FaGithub className="text-2xl text-white hover:text-black duration-300" />
                </a>
                <span>Github</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <h3 className="text-lg font-semibold mb-4">Copyrights &#169; 2025</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="text-[#F0EDCC] hover:text-white cursor-pointer duration-300">Terms & Conditions</li>
              <li className="text-[#F0EDCC] hover:text-white cursor-pointer duration-300">Privacy Policy</li>
              <li className="text-[#F0EDCC] hover:text-white cursor-pointer duration-300">Refund & Cancellation</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
    </>
  )
}

export default Footer