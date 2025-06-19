import React, { useContext, useState, useEffect } from 'react'
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
  // Sync search input with URL changes
  useEffect(() => {
    setSearch(searchInput?.search.split('=')[1] || '');
  }, [searchInput]);
  return (
    <>
      <header className='h-auto min-h-[72px] shadow-md bg-white fixed w-full z-40 flex items-center'>
        <div className='container mx-auto flex flex-row items-center px-2 md:px-8 justify-between w-full gap-2 flex-wrap'>
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link to={'/'} className="flex items-center gap-2">
              <Logo w={60} h={60} />
              <span className="font-bold text-lg hidden sm:inline">SaiEcommerce</span>
            </Link>
          </div>
          {/* Search Input */}
          <div className="flex items-center flex-1 max-w-xs md:max-w-xl rounded-full bg-gray-100 border focus-within:shadow-md pl-3 py-2 mx-2">
            <input
              type="text"
              placeholder="Search the Product..."
              className="w-full outline-none bg-gray-100 text-base px-3 py-2 rounded-l-full shadow-sm focus:ring-2 focus:ring-red-400 transition-all duration-200 border-none"
              onChange={handleOnSearch}
              value={search}
              style={{ minWidth: 0 }}
            />
            <button className="text-2xl min-w-[40px] h-10 bg-red-600 flex items-center justify-center rounded-r-full text-white hover:bg-red-700 transition-all duration-200 ml-0">
              <GrSearch/>
            </button>
          </div>
          {/* User, Cart, and Auth Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {user?._id && (
              <div className='text-2xl cursor-pointer flex items-center justify-center' onClick={()=>setmenuDisplay(preve=>!preve)}>
                {user?.profilePic ? (
                  <img src={user?.profilePic} className='h-10 w-10 rounded-full object-cover border-2 border-red-500' alt={user?.name}/>
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
            {user?._id && (
              <Link to={'/cart'} className='text-2xl relative flex items-center'>
                <span><FaShoppingCart /></span>
                <div className='bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center absolute -top-2 -right-3 text-xs border-2 border-white'>
                  <p>{context?.cartProductCount}</p>
                </div>
              </Link>
            )}
            <div className="flex items-center">
              {user?._id ? (
                <button onClick={handleLogout} className='px-4 py-2 bg-red-600 hover:bg-red-700 rounded-full text-white font-semibold shadow transition-all duration-200 ml-2'>Logout</button>
              ) : (
                <Link to={'/login'} className='px-4 py-2 bg-red-600 hover:bg-red-700 rounded-full text-white font-semibold shadow transition-all duration-200 ml-2'>Login</Link>
              )}
            </div>
          </div>
        </div>
      </header>
      <div className="h-8"></div>
      {/*
        NOTE: If the Login button still shows after logging in, check your login flow:
        - Ensure you update the Redux store/context with user info after login.
        - Use credentials: 'include' in fetch/axios for login and user info.
        - Make sure backend CORS allows credentials and your frontend domain.
      */}
    </>
  )
}
export default Header