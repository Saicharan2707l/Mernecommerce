import React, { useContext } from 'react'
import signin from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { useState } from 'react';
import { FaEyeSlash } from "react-icons/fa";
import { Link,useNavigate } from 'react-router-dom';
import summaryApi from '../common/index'
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
  const [showpasswod,setpassword]=useState(false);
  const [data,setData]=useState(
  {
    email:"",
    password:""
  }
)
  const navigate = useNavigate()
  const { fetchUserDetails,fetchUserAddToCart }=useContext(Context)
  
const handleOnChange = (e) =>{
  const { name , value } = e.target
  setData((preve)=>{
      return{
          ...preve,
          [name] : value
      }
  })
}
const handleSubmit=async(e)=>{
  e.preventDefault();
  const dataResponse = await fetch(summaryApi.signIn.url, {
      method: summaryApi.signIn.method,
      credentials:'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data),
    })
    const dataapi = await dataResponse.json()
    if(dataapi.success){
      toast.success(dataapi.message)      
      navigate('/')
      fetchUserDetails()
      fetchUserAddToCart()
      
    }
    if(dataapi.error){
      toast.error(dataapi.message)
    }
}
  return (
    <section id='login' className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className='bg-white shadow-lg p-8 w-full max-w-md rounded-lg'>
        <div className='w-24 h-24 mx-auto mb-4 flex items-center justify-center rounded-full bg-red-50 border-4 border-red-500'>
          <img src={signin} alt='login icon' className="w-16 h-16 object-contain" />
        </div>
        <form className='space-y-6' onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <div className='bg-slate-100 rounded-md'>
              <input
                type="email"
                placeholder='Enter Email'
                onChange={handleOnChange}
                value={data.email}
                name='email'
                className='w-full h-12 outline-none bg-transparent p-3 rounded-md'
                required
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Password</label>
            <div className='bg-slate-100 rounded-md flex items-center'>
              <input
                type={showpasswod ? "text" : "password"}
                placeholder='Enter Password'
                onChange={handleOnChange}
                name='password'
                value={data.password}
                className='w-full h-12 outline-none bg-transparent p-3 rounded-md'
                required
              />
              <span
                className='text-xl px-3 cursor-pointer flex items-center'
                onClick={() => setpassword(prev => !prev)}
              >
                {showpasswod ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="flex justify-end mt-1">
              <Link to={'/forgot-password'} className='hover:underline text-red-600 text-sm'>Forgot password?</Link>
            </div>
          </div>
          <button
            className='bg-red-600 text-white font-semibold py-2 rounded-full w-full hover:bg-red-700 transition-all duration-200 shadow-md'
          >
            Login
          </button>
        </form>
        <p className='mt-6 text-center text-gray-700'>
          Don't have an account?{' '}
          <Link to={'/sign-up'} className='text-red-600 hover:underline font-semibold'>
            Signup
          </Link>
        </p>
      </div>
    </section>
  )
}
export default Login