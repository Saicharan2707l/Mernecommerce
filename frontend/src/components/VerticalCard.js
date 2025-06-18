import React, { useContext } from 'react'
import scrollTop from '../helpers/scrollTop'
import addToCart from '../helpers/addToCart'
import Context from '../context'
import dispalyINRCurrency from '../helpers/displayCurrency'
import { Link } from 'react-router-dom'

const VerticalCard = ({loading,data=[]}) => {
    const Loadinglist=new Array(13).fill(null)  
    const {fetchUserAddToCart}=useContext(Context)
    
    const handleAddToCart=async(e,id)=>{
      await addToCart(e,id)
      fetchUserAddToCart()
    }
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-4 py-4'>
        { 
        loading ? (
        Loadinglist.map((product,index)=>{
            return (
            <div className='w-full min-w-[280px] md:max-w-[320px] max-w-[280px] md:min-w-[320px] bg-white rounded-xl shadow-lg p-6' key={"product"+index}>
                <div className='bg-slate-200 p-4 h-44 min-w-[120px] md:min-w-[145px] flex justify-center items-center animate-pulse rounded-lg'>
                    
                </div>
                <div className='p-4 grid gap-2'>
                  <h2 className='font-medium md:text-lg text-base text-ellipsis line-clamp-1 bg-slate-200 p-2 rounded-full animate-pulse'></h2>
                  <p className='capitalize text-slate-500'></p>
                  <div className='flex gap-2 w-full'>
                    <p className='bg-slate-200 font-medium p-2 w-full rounded-full animate-pulse'></p>
                    <p className='bg-slate-200 line-through p-1 w-full rounded-full animate-pulse'></p>                                        
                    </div>
                    <button className='text-sm bg-slate-200 text-white rounded-full p-2 animate-pulse'>
                      
                    </button>
                    
                </div>
            </div>
            )
          })
        ):(
          data.map((product,index)=>{
            return (
            <Link to={"/product/"+product?._id} className='w-full min-w-[280px] md:max-w-[320px] max-w-[280px] md:min-w-[320px] bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:shadow-xl hover:scale-[1.03] transition-all duration-300 group' key={index} onClick={scrollTop}>
                <div className='bg-slate-200 p-4 h-44 min-w-[120px] md:min-w-[145px] flex justify-center items-center rounded-lg mb-4'>
                    <img src={product.productImage[0]} className='h-full object-scale-down hover:scale-125 transition-all mix-blend-multiply'/>
                </div>
                <div className='p-4 grid gap-2 w-full'>
                  <h2 className='font-medium md:text-lg text-base text-ellipsis line-clamp-1'>{product?.productName}</h2>
                  <p className='capitalize text-slate-500'>{product?.category}</p>
                  <div className='flex gap-2'>
                    <p className='bg-red-400 font-medium'>{dispalyINRCurrency(product?.selling)}</p>
                    <p className='bg-slate-300 line-through'>{dispalyINRCurrency(product?.price)}</p>   
                                      
                    </div>
                    <button className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full' onClick={(e)=>handleAddToCart(e,product?._id)}>
                      Add to Cart
                    </button>
                    
                </div>
            </Link>
            )
          })
        )
          
        }   
    </div>
  )
}

export default VerticalCard