import { Link } from 'react-router-dom';
import summaryApi from '../common';
import React, { useEffect, useState } from 'react'

const CategoryList = () => {
      const [categoryProduct,setCategoryProduct]=useState([])
      const [loading,setLoading]=useState(false)
      
      const categoryLoading=new Array(7).fill(null)
      const fetchCategoryProduct=async()=>{
        setLoading(true)
        const response=await fetch(summaryApi.categoryProduct.url)
        const dataResponse=await response.json()
        setLoading(false)
        setCategoryProduct(dataResponse.data)
        
      }
      useEffect(()=>{
        fetchCategoryProduct()
      },[])
    
      return (
        <div className='container mx-auto p-4 overflow-scroll scrollbar-none'>
          <div className='flex items-center justify-between gap-4 '>
          {
            loading ? (
                categoryLoading.map((product,index)=>{
                  return(
                    <div className='w-16 h-16 md:w-20 md:h-20 bg-slate-200 overflow-hidden rounded-full animate-pulse' key={"categoryLoading"+index}>
                
                    </div>
                  )
                })              
            ):(
              categoryProduct.map((product,index)=>{
                return(
                  <Link to={'/product-category/?category='+product?.category} className='cursor-pointer' key={product?.category+"index"}>
                    <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
                        <img src={product?.productImage[0]} alt={product?.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all'/>
                    </div>
                    <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
                  </Link>
                )
      
              })
            )
            
          }
          </div>
        </div>
      )
    }
  export default CategoryList