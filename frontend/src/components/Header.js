import React, { useState } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import summaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
const Header = () => {
  const user=useSelector(state=>state?.user?.user);
  const dispatch=useDispatch()
  const [menuDisplay,setmenuDisplay]=useState(false)
  const handleLogout=async()=>{
    const fetchData=await fetch(summaryApi.userLogout.url,{
      method:summaryApi.userLogout.method,
      credentials:"include"
    })
    const data=await fetchData.json();
    if(data.success){
      toast.success(data.message)
      dispatch(setUserDetails(null))
    }
    else{
      toast.error(data.message)
    }
  }
  return (
    <header className='h-16 shadow-md bg-white'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        <div className=''>
          <Link to={'/'}>
            <Logo w={90} h={50}/>
          </Link>
        </div>
        <div className='flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
          <input type='text' placeholder='Search the Product...'className='w-full outline-none'/>
          <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
            <GrSearch />
          </div>
        </div>
        <div className='flex items-center gap-7'>
          <div className='relative flex justify-center'>
            {
              user?._id &&(
              <div className='text-3xl cursor-pointer relative flex justify-center' onClick={()=>setmenuDisplay(preve=>!preve)}>
                  {
                    user?.profilePic?(
                      <img src={user?.profilePic}  className='h-10 w-10 rounded-full object-cover' alt={user?.name}/>
                    ):(
                      <FaRegCircleUser />
                    )
                  }
            </div>
              )
            }
            {
              menuDisplay&&(
                <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
              <nav>
                {
                  user?.role===ROLE.ADMIN &&(
                    <Link to={'/admin-panel/all-products'} className='whitespace-nowrap hidden md:block hover:bg-slate-100'  onClick={()=>{setmenuDisplay(prev=>!prev)}}>Admin Panel</Link>
                  )
                }
                
              </nav>
            </div>
              )
            }            
          </div> 
          <div className='text-2xl relative'>
            <span><FaShoppingCart /></span>
            <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
              <p>0</p>
            </div>
          </div>
          <div>
            {
              user?._id?(
                <button onClick={handleLogout} className='px-3 py-1 bg-red-600 hover:bg-red-700 rounded-full text-white'>Logout</button>
              ) : (
              <Link to={'/login'} className='px-3 py-1 bg-red-600 hover:bg-red-700 rounded-full text-white'>Login</Link>
              )
            }            
          </div>
        </div>
      </div>
    </header>
  )
}
export default Header