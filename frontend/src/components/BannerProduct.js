import React, { useEffect, useState } from 'react'
import img1 from '../assest/banner/img1.webp'
import img2 from '../assest/banner/img2.webp'
import img3 from '../assest/banner/img3.jpg'
import img4 from '../assest/banner/img4.jpg'
import img5 from '../assest/banner/img5.webp'
import img1_mobile from '../assest/banner/img1_mobile.jpg'
import img2_mobile from '../assest/banner/img2_mobile.webp'
import img3_mobile from '../assest/banner/img3_mobile.jpg'
import img4_mobile from '../assest/banner/img4_mobile.jpg'
import img5_mobile from '../assest/banner/img5.webp'
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa";
const BannerProduct = () => {
  const [currentImage,setCurrentImage]=useState(0)
    const desktopImages=[
      img1,
      img2,
      img3,
      img4,
      img5
    ]
    const mobileImgages=[
      img1_mobile,
      img2_mobile,
      img3_mobile,
      img4_mobile,
      img5_mobile
    ]
    const handleNextImage=()=>{
      if(currentImage<desktopImages.length-1){
        setCurrentImage(prev=>prev+1)
      }
    }
    const handlePrevImage=()=>{
      if(currentImage!=0){
        setCurrentImage(prev=>prev-1)
      }
    }
    useEffect(()=>{
      const interval=setInterval(()=>{
        if(currentImage<desktopImages.length-1){
          handleNextImage()
        }else{
          setCurrentImage(0)
        }
      },5000)
      return ()=>clearInterval(interval)
    },[currentImage])

  return (
    <div className='container mx-auto px-4 rounded '>
        <div className='h-52 md:h-72 w-full bg-slate-200 relative'>
          {/* Left Arrow */}
          <button
            className='absolute -left-6 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center text-2xl hover:bg-red-100 border border-slate-200 transition-all duration-200 hidden md:flex'
            onClick={handlePrevImage}
            aria-label='Previous Banner'
          >
            <FaAngleLeft />
          </button>
          {/* Right Arrow */}
          <button
            className='absolute -right-6 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center text-2xl hover:bg-red-100 border border-slate-200 transition-all duration-200 hidden md:flex'
            onClick={handleNextImage}
            aria-label='Next Banner'
          >
            <FaAngleRight />
          </button>
          {/**It's for the desktop and tablet Version*/}
          <div className='hidden md:flex h-full w-full overflow-hidden'>            
            {            
              desktopImages.map((images,index)=>{
                return(
                  <div className='cursor-pointer w-full h-full min-w-full min-h-full transition-all' 
                    style={{transform: `translateX(-${currentImage*100}%)`}} 
                    key={images}>
                    <img src={images} className='w-full h-full'/>
                </div>
                )              
              })
            }
          </div>
          {/*It's for mobile Version*/}
          <div className='flex h-full w-full overflow-hidden md:hidden'>            
            {            
              mobileImgages.map((images,index)=>{
                return(
                  <div className='cursor-pointer w-full h-full min-w-full min-h-full transition-all' 
                    style={{transform: `translateX(-${currentImage*100}%)`}} 
                    key={images}>
                    <img src={images} className='w-full h-full object-fill'/>
                </div>
                )              
              })
            }
          </div>
        </div>
    </div>
  )
}

export default BannerProduct