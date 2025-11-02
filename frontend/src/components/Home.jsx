import React from 'react'
import Navbar from './Navbar'
import Section from './Section'
import Footer from './Footer'
import Card from './Card'

function Home() {
  return (
    <>
<div className="bg-linear-to-r from-[#2C3E50] to-[#4CA1AF] 
bg-fixed bg-cover min-h-screen ">

  <div className='h-screen'>
  <Navbar/>
  <Section/>
  <Card/>
  <Footer/>
  </div>

</div>

    </>
    
  )
}

export default Home