import React, { useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import summaryApi from '../common/index'
import { toast } from 'react-toastify';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  })
  const navigate = useNavigate()
  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const handleUploadPic = async (e) => {
    const file = e.target.files[0]
    const imagePic = await imageTobase64(file)
    setData((preve) => {
      return {
        ...preve,
        profilePic: imagePic
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(summaryApi.signUp.url, {
        method: summaryApi.signUp.method,
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data),
      })
      const dataapi = await dataResponse.json()
      if(dataapi.success){
        toast.success(dataapi.message)
        navigate('/login')
      }
      if(dataapi.error){
        toast.error(dataapi.message)
      }
    }
    else{
      console.log("Confirm password and password should be same")
    }
  }

  return (
    <section id='signup' className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className='bg-white shadow-lg p-8 w-full max-w-md rounded-lg'>
        <div className='w-24 h-24 mx-auto mb-4 flex items-center justify-center rounded-full bg-red-50 border-4 border-red-500 relative overflow-hidden'>
          <img src={data.profilePic || loginIcons} alt='profile' className="w-20 h-20 object-cover rounded-full" />
          <form className="absolute bottom-0 left-0 w-full">
            <label className="block cursor-pointer bg-slate-200 bg-opacity-80 text-xs text-center py-2">
              Upload Photo
              <input type='file' className='hidden' onChange={handleUploadPic} />
            </label>
          </form>
        </div>
        <form className='space-y-6' onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-semibold">Name</label>
            <div className='bg-slate-100 rounded-md'>
              <input
                type='text'
                placeholder='Enter your name'
                name='name'
                value={data.name}
                onChange={handleOnChange}
                required
                className='w-full h-12 outline-none bg-transparent p-3 rounded-md' />
            </div>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <div className='bg-slate-100 rounded-md'>
              <input
                type='email'
                placeholder='Enter email'
                name='email'
                value={data.email}
                onChange={handleOnChange}
                required
                className='w-full h-12 outline-none bg-transparent p-3 rounded-md' />
            </div>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Password</label>
            <div className='bg-slate-100 rounded-md flex items-center'>
              <input
                type={showPassword ? "text" : "password"}
                placeholder='Enter password'
                value={data.password}
                name='password'
                onChange={handleOnChange}
                required
                className='w-full h-12 outline-none bg-transparent p-3 rounded-md' />
              <span className='text-xl px-3 cursor-pointer flex items-center' onClick={() => setShowPassword((preve) => !preve)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Confirm Password</label>
            <div className='bg-slate-100 rounded-md flex items-center'>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder='Enter confirm password'
                value={data.confirmPassword}
                name='confirmPassword'
                onChange={handleOnChange}
                required
                className='w-full h-12 outline-none bg-transparent p-3 rounded-md' />
              <span className='text-xl px-3 cursor-pointer flex items-center' onClick={() => setShowConfirmPassword((preve) => !preve)}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <button className='bg-red-600 text-white font-semibold py-2 rounded-full w-full hover:bg-red-700 transition-all duration-200 shadow-md mt-2'>Sign Up</button>
        </form>
        <p className='mt-6 text-center text-gray-700'>
          Already have an account?{' '}
          <Link to={"/login"} className='text-red-600 hover:underline font-semibold'>Login</Link>
        </p>
      </div>
    </section>
  )
}

export default SignUp