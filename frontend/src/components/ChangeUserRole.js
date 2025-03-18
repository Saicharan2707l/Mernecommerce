import React, { useState } from 'react'
import ROLE from '../common/role'
import { IoCloseSharp } from "react-icons/io5";
import summaryApi from '../common';
import { toast } from 'react-toastify';
const ChangeUserRole = ({
  userId,
  name,
  email,
  role,
  onClose,
  callFunction
}) => {
  const [userRole,setuserRole]=useState(role);
  const handleOnChangeSelect=(e)=>{
    setuserRole(e.target.value)
    console.log(e.target.value)
  }
  const updateUserRole=async()=>{
    const fetchDataResponse=await fetch(summaryApi.update_user.url,{
      method:summaryApi.update_user.method,
      credentials:"include",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        userId:userId, 
        role:userRole
      })
    })
    const DataResponse=await fetchDataResponse.json()
    console.log("User DetailsDataResponse",DataResponse)
    if(DataResponse.success){
      toast.success(DataResponse.message)
      onClose()
      console.log("Updating the user roles............")
      callFunction()
    }
    if(DataResponse.error){
      toast.error(DataResponse.error)
    }
  };
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50'>
      <div className='mx-auto bg-white shadow-md max-w-sm w-full p-4'>
        <button className='block ml-auto' onClick={onClose}>
          <IoCloseSharp />
        </button>
        <h1 className='font-medium pb-4 text-lg'>Change User Role</h1>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <div className='flex justify-between my-4'>
          <p>Role:</p>
          <select className='border px-4 py-1' value={userRole} 
          onChange={handleOnChangeSelect}
          
          > {
              Object.values(ROLE).map(role=>{
                return(
                  <option value={role} key={role}>{role}</option>
                )
              }
              )          
          }
          </select>
        </div>
          <button className='w-fit mx-auto block px-3 py-1 rounded-full bg-red-500 text-white hover:bg-red-700' onClick={updateUserRole}>ChangeUserRole</button>
      </div>
    </div>
  )
}
export default ChangeUserRole