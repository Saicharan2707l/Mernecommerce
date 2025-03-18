import React, { useEffect, useState } from 'react'
import summaryApi from '../common'
import moment from 'moment'
import { MdEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

export const AllUsers = () => {
  const [allUser,setallUsrs]=useState([])
  const [openrole,setopenrole]=useState(false)
  const [openUpdaterole,setopenUpdaterole]=useState({
      name:"",
      email:"",
      role:"",
      _id:""
    })
  const fetchUserDetails=async()=>{
    const dataResponse=await fetch(summaryApi.all_user.url,{
      method:summaryApi.all_user.method,
      credentials:'include'
    })
    const data=await dataResponse.json()
    console.log("All User Console",data)
    if(data.success){
      setallUsrs(data.data)
    }
    if(data.error){
      setallUsrs(data.message)
    }
  }
  useEffect(()=>{
    fetchUserDetails()
  },[])
  return (
    <div className='pb-4 bg-white'>
        <table className='w-full userTable'>
          <thead>        
            <tr className='bg-black text-white'>
                <th>Sr.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created Date</th>
                <th>Action</th>
              </tr>
        </thead>
        <tbody>
        {
            allUser.map((ele,indx)=>{
              return(
                <tr>
                  <td>{indx+1}</td>
                  <td>{ele?.name}</td>
                  <td>{ele?.email}</td>
                  <td>{ele?.role}</td>
                  <td>{moment(ele?.createdAt).format('L')}</td>
                  <td>
                    <button className='bg-green-200 p-2 rounded-full hover:bg-green-500 hover:text-white' onClick={()=>{
                      setopenrole(true)
                      setopenUpdaterole(ele)
                    }}>
                      <MdEdit/>
                    </button>
                  </td>
                </tr>                
              )
            })
        }
        </tbody>
      </table>
      {
        openrole &&( <ChangeUserRole onClose={()=>setopenrole(false)}
        name={openUpdaterole.name}
        email={openUpdaterole.email}
        role={openUpdaterole.role}
        userId={openUpdaterole._id}
        callFunction={fetchUserDetails}
        />)
      }
    </div>
  )
}