import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import summaryApi from '../common'
import VerticalCard from '../components/VerticalCard'

const SearchProduct = () => {
    const query=useLocation()
    console.log("search product id is",query.search)
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false)
    const fectchProduct=async()=>{
        setLoading(true)
        const response =await fetch(summaryApi.searchProduct.url+query.search)
        const dataresponse=await response.json()
         setLoading(false)
        setData(dataresponse.data)
        console.log("data response is",dataresponse.data)
    }
    useEffect(()=>{
        fectchProduct()
    },[query])
  return (
    <div className='mx-auto container p-4'>
        {
            loading && (
                <p className='flex justify-center font-medium text-lg'>Loading...</p>
            )
        }
        <p className='text-lg font-semibold mx-5 my-5'>SearchProduct:{data.length}</p>
        {
            data.length===0 && !loading && (
                <p className='bg-white text-lg text-center p-4'>No Data Found...</p>
            )
        }
        {
            data.length!==0 && !loading && (
                        <VerticalCard loading={loading} data={data}/>
                  
            )

        }
    </div>
  )
}

export default SearchProduct