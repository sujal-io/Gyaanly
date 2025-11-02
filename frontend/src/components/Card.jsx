
import React, { useEffect, useState, useRef } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { BACKEND_URL } from '../../utils/utils';

function Card() {
  const [courses, setCourses] = useState([]);
  const computeSlides = (w) => {
    if (w < 480) return 1;
    if (w < 768) return 2;
    if (w < 1024) return 3;
    return 4;
  };
  const [slidesToShowState, setSlidesToShowState] = useState(() => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1280;
    return computeSlides(w);
  });
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/course/courses`);
        setCourses(response.data.courses || []);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const updateSlides = () => {
      const w = typeof window !== 'undefined' ? window.innerWidth : 1280;
      setSlidesToShowState(computeSlides(w));
    };
    window.addEventListener('resize', updateSlides);
    return () => window.removeEventListener('resize', updateSlides);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShowState,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
    initialSlide: 0,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 1, infinite: true, dots: true },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2, slidesToScroll: 1, infinite: true },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1, infinite: true },
      },
    ],
  };

  if (!courses.length) {
    return (
      <div className='container mx-auto w-full px-2 py-8'>
        <p className='text-center text-white'>Loading courses...</p>
      </div>
    );
  }

  return (
    <div className='container mx-auto w-full px-2 py-8'>
      <Slider ref={sliderRef} className="custom-slider" {...settings}>
        {courses.map((course) => (
          <div key={course._id} className='p-2'>
            <div className='transition-transform duration-300 transform hover:scale-105'>
              <div className='bg-linear-to-r from-[#2C3E50] to-[#4CA1AF] rounded-lg overflow-hidden'>
                <img
                  className='h-32 w-full object-contain mt-4'
                  src={course.image?.url}
                  alt={course.title}
                />
                <div className='p-4 text-center'>
                  <h2 className='text-lg md:text-xl font-bold text-white'>{course.title}</h2>
                  <button className="mt-4 bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-blue-500 duration-300">
                    Enroll now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Card;