import React from 'react'
import { CgClose } from "react-icons/cg";

const DisplayImage = ({
    imgUrl,
    onClose
}) => {
  return (
    <div className='fixed left-0 right-0 bottom-0 top-0 flex justify-center items-center bg-black bg-opacity-70 z-50'>
      <div className='max-w-2xl bg-white shadow-2xl w-full max-h-[80%] overflow-hidden'>
        <div className='p-3 flex justify-between items-center border-b '>
          <h3 className='font-medium'>Image Preview</h3>
          <div className='text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
          <CgClose/>
        </div>
      </div>
      <div className='p-4 flex justify-center items-center'>
          <img 
            src={imgUrl} 
            className='max-w-full max-h-[60vh] object-contain'
            alt="Product preview" 
          />
        </div>
        </div>
        </div>
  )
}
export default DisplayImage