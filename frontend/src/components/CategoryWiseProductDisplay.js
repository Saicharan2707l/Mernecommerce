import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import dispalyINRCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'
import scrollTop from '../helpers/scrollTop'

const CategoryWiseProductDisplay = ({category,heading}) => {
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(true)
    const Loadinglist=new Array(13).fill(null)    
    const {fetchUserAddToCart}=useContext(Context)
    const scrollRef = useRef(null)
    const handleAddToCart=async(e,id)=>{
      await addToCart(e,id)
      fetchUserAddToCart()
    }
    const fetchData=async()=>{
      setLoading(true)
      const categoryProduct=await fetchCategoryWiseProduct(category)
      setLoading(false)
      setData(categoryProduct?.data)
    }
    useEffect(() => {
      if (category) fetchData();
    }, [category]);

    // Scroll functions for arrows
    const scrollLeft = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: -350, behavior: 'smooth' })
      }
    }
    const scrollRight = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: 350, behavior: 'smooth' })
      }
    }

    return (
      <div className='container mx-auto px-4 my-6 relative gap-1'>
        <h2 className='text-2xl font-semibold py-2 px-12'>{heading}</h2>
        <div className='relative'>
          {/* Left Arrow */}
          <button
            className='absolute -left-6 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center text-2xl hover:bg-red-100 border border-slate-200 transition-all duration-200'
            style={{ display: data.length > 4 ? 'flex' : 'none' }}
            onClick={scrollLeft}
            aria-label='Scroll Left'
          >
            <FaAngleLeft />
          </button>
          {/* Product Row */}
          <div
            ref={scrollRef}
            className='flex gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200 py-2 px-12 scroll-smooth no-scrollbar'
            style={{ scrollBehavior: 'smooth' }}
          >
            {loading
              ? Loadinglist.map((product, index) => (
                  <div className='min-w-[280px] max-w-[320px] bg-white rounded-xl shadow-md p-4 flex flex-col items-center' key={'product'+index}>
                    <div className='bg-slate-200 p-4 h-44 w-full flex justify-center items-center animate-pulse rounded-lg mb-4'></div>
                    <div className='flex flex-col justify-between w-full flex-1'>
                      <h2 className='font-medium text-lg text-ellipsis line-clamp-1 bg-slate-200 p-2 rounded animate-pulse mb-2'></h2>
                      <p className='capitalize text-slate-400 text-sm mb-2 text-center'></p>
                      <div className='flex gap-2 mb-2'>
                        <p className='bg-slate-200 font-medium p-2 w-20 rounded animate-pulse'></p>
                        <p className='bg-slate-200 line-through p-1 w-16 rounded animate-pulse'></p>
                      </div>
                      <button className='text-sm bg-slate-200 text-white rounded-full p-2 animate-pulse w-full'></button>
                    </div>
                  </div>
                ))
              : data.map((product, index) => (
                  <Link
                    to={'/product/' + product?._id}
                    className='min-w-[280px] max-w-[320px] bg-white rounded-xl shadow-md p-4 flex flex-col items-center hover:shadow-xl hover:scale-[1.03] transition-all duration-300 group'
                    key={index}
                    onClick={scrollTop}
                  >
                    <div className='bg-slate-100 p-4 h-44 w-full flex justify-center items-center rounded-lg mb-4 overflow-hidden'>
                      <img
                        src={product.productImage[0]}
                        className='h-32 object-contain group-hover:scale-110 transition-transform duration-300'
                        alt={product?.productName}
                      />
                    </div>
                    <div className='flex flex-col justify-between w-full flex-1'>
                      <h2 className='font-semibold text-lg text-ellipsis line-clamp-1 mb-1'>{product?.productName}</h2>
                      <p className='capitalize text-slate-500 text-sm mb-2 text-center'>{product?.category && product?.category.charAt(0).toUpperCase() + product?.category.slice(1)}</p>
                      <div className='flex gap-2 mb-2 justify-center'>
                        <p className='text-red-600 font-bold'>{dispalyINRCurrency(product?.selling)}</p>
                        <p className='line-through text-gray-400'>{dispalyINRCurrency(product?.price)}</p>
                      </div>
                      <button
                        className='bg-red-600 text-white rounded-full px-6 py-2 w-full hover:bg-red-700 transition-all duration-200 font-semibold shadow'
                        onClick={e => handleAddToCart(e, product?._id)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </Link>
                ))}
          </div>
          {/* Right Arrow */}
          <button
            className='absolute -right-6 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center text-2xl hover:bg-red-100 border border-slate-200 transition-all duration-200'
            style={{ display: data.length > 4 ? 'flex' : 'none' }}
            onClick={scrollRight}
            aria-label='Scroll Right'
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    )
}
export default CategoryWiseProductDisplay