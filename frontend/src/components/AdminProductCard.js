import React, { useState } from 'react'
import { MdModeEdit } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import dispalyINRCurrency from '../helpers/displayCurrency';

const AdminProductCard = ({
    product,
    fetchAllproduct
}) => {
const [editProduct,setEditProduct]=useState(false)
  return (
    <div className='p-4 bg-white rounded items-center '>
        <div className='w-40'>
            <div className='w-32 h-32 flex justify-center align-center'>
                <img src={product?.productImage[0]} width={100} height={100} className='mx-auto object-fill h-full'/>
            </div>
            
            <h1  className='text-ellipsis  line-clamp-2'>{product?.productName}</h1>
            <div>
                <div>
                    <p className='font-semibold'>{
                        dispalyINRCurrency(product.price)
                    }
                    </p>
                </div>
                <div className='w-fit ml-auto bg-green-200 hover:text-white p-1 rounded-full hover:bg-green-600 cursor-pointer' onClick={()=>setEditProduct(true)}>
                    <MdModeEdit/>
                </div>
            </div>

            {
                editProduct && <AdminEditProduct ProductData={product} onClose={()=>setEditProduct(false)} fetchAllproduct={fetchAllproduct}/>
            }
        </div>
        
    </div>
  )
}

export default AdminProductCard