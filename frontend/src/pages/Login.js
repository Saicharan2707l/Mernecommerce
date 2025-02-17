import React from 'react'
import signin from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { useState } from 'react';
import { FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
const Login = () => {
  const [showpasswod,setpassword]=useState(false);
  const [data,setData]=useState(
    {
    email:"",
    password:""
  }
)
const handleOnChange = (e) =>{
  const { name , value } = e.target
  setData((preve)=>{
      return{
          ...preve,
          [name] : value
      }
  })
}
  console.log("hfsgwcvhjbkjke"+data)
  return (
    <section id='login'>
      <div className='mx-auto container p-4'>
        <div className='bg-white pl-4 py-4 w-full max-w-md mx-auto rounded'>
          <div className='w-20 h-20 mx-auto '>
            <img src={signin} alt='login icons'/>
          </div>
          <form className='pt-4'>
            <div className='grid'>
              <label>Email</label>
            <div className='bg-slate-100'>
              <input type="email" placeholder='Enter Email' onChange={handleOnChange} value={data.email} name='email' className='w-full h-full outline-none bg-transparent p-2'/>
            </div>        
            </div>
            <div className='' >
              <label>Password</label>
              <div className='bg-slate-100 flex'>
                <input type={showpasswod? "text":"password"} placeholder='Enter Password' onChange={handleOnChange} name='password' value={data.password} className='w-full h-full outline-none bg-transparent p-2'/>
                <div className='cursor-pointer pt-2 pr-3'>
                  <span className='text-xl pt-6' onClick={()=>setpassword(prev=>!prev)}>
                    {
                      showpasswod?(
                        <FaEyeSlash />
                      ):
                      (
                        <FaEye/>
                      )
                    }
                  </span>
                </div>                
              </div>
              <Link to={'/forgot-password'} className='hover:underline block w-fit ml-auto text-red-600 cursor-pointer'>Forgot password</Link>
              <button className='bg-red-600 px-2 py-1 hover:bg-red-700  w-full max-w-[100px] hover:scale-110 rounded-full mx-auto block mt-4'>Login</button>
            </div>
          </form>
          <p className='pl-2 '>Don't have an account ? <Link to={'/sign-up'} className='text-red-600 hover:text-red-600 hover:underline'>Signup</Link></p>
        </div>
      </div>        
    </section>
  )
}
export default Login