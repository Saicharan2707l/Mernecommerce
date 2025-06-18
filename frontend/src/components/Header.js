import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import summaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {
  const user=useSelector(state=>state?.user?.user);
  const dispatch=useDispatch()
  const [menuDisplay,setmenuDisplay]=useState(false)
  const context=useContext(Context)
  const searchInput=useLocation()
  const [search,setSearch] = useState(searchInput?.search.split("=")[1])
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
    if(data.error){
      toast.error(data.message)
    }
  }
  const navigate=useNavigate()
  const handleOnSearch=(e)=>{
    const {value}=e.target
    setSearch(value)
    if(value){
      navigate(`/search?q=${value}`)

    }
    else{
      navigate(`/search`)
    }


  }
  return (
    <>
      <header className='h-16 shadow-md bg-white fixed w-full z-40 flex items-center'>
        <div className='h-full container mx-auto flex items-center px-8 justify-between w-full'>
          <div className="flex items-center gap-3">
            <Link to={'/'} className="flex items-center gap-3">
              <Logo w={100} h={40} />
            </Link>
          </div>
          <div className="flex items-center w-full max-w-xl mx-8 rounded-full bg-slate-100 border focus-within:shadow-md pl-4 py-2">
            <input
              type="text"
              placeholder="Search the Product..."
              className="w-full outline-none bg-transparent text-base px-2"
              onChange={handleOnSearch}
              value={search}
            />
            <button className="text-xl min-w-[40px] h-8 bg-red-600 flex items-center justify-center rounded-full text-white hover:bg-red-700 transition-all duration-200 ml-2">
              <GrSearch/>
            </button>
          </div>
          <div className="flex items-center gap-8">
            <div className='relative flex justify-center'>
              {user?._id && (
                <div className='text-3xl cursor-pointer relative flex justify-center items-center' onClick={()=>setmenuDisplay(preve=>!preve)}>
                  {user?.profilePic ? (
                    <img src={user?.profilePic} className='h-12 w-12 rounded-full object-cover border-2 border-red-500' alt={user?.name}/>
                  ) : (
                    <FaRegCircleUser className='text-gray-600'/>
                  )}
                </div>
              )}
              {menuDisplay && (
                <div className='absolute bg-white top-14 right-0 min-w-[140px] p-3 shadow-xl rounded-lg z-50'>
                  <nav className='flex flex-col gap-2'>
                    {user?.role === ROLE.ADMIN && (
                      <Link to={'/admin-panel/all-products'} className='whitespace-nowrap hover:bg-slate-100 px-2 py-1 rounded' onClick={()=>{setmenuDisplay(prev=>!prev)}}>Admin Panel</Link>
                    )}
                  </nav>
                </div>
              )}
            </div>
            {user?._id && (
              <Link to={'/cart'} className='text-3xl relative'>
                <span><FaShoppingCart /></span>
                <div className='bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center absolute -top-2 -right-3 text-xs border-2 border-white'>
                  <p>{context?.cartProductCount}</p>
                </div>
              </Link>
            )}
            <div>
              {user?._id ? (
                <button onClick={handleLogout} className='px-5 py-2 bg-red-600 hover:bg-red-700 rounded-full text-white font-semibold shadow transition-all duration-200'>Logout</button>
              ) : (
                <Link to={'/login'} className='px-5 py-2 bg-red-600 hover:bg-red-700 rounded-full text-white font-semibold shadow transition-all duration-200'>Login</Link>
              )}
            </div>
          </div>
        </div>
      </header>
      <div className="h-8"></div>
    </>
  )
}
export default Header