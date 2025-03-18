import React, { useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { MdDescription } from 'react-icons/md';
import ProductCategory from '../helpers/ProductCategory';
const UploadProducts = ({ onClose }
) => {
    const [data,setData]=useState({
        productName:"",
        brandName:"",
        category:"",
        productImage:"",
        description:"",
        price:"",
        selling:""
    })
    const handleOnChange=(e)=>{
        console.log(e)
    }
  return (
    <div className='fixed bg-opacity-35 bg-slate-200 h-full w-full top-0 bottom-0 left-0 right-0 flex items-center justify-center'>
        <div className='border-4 p-4 bg-white rounded w-full max-w-md h-full max-h-[75%] overflow-hidden'>
            <div className='flex items-center justify-center pb-4'>
                <h2 className='font-bold text-lg'>Upload Product</h2>
                <div className='w-fit ml-auto text-xl hover:cursor-pointer hover:text-red-600' onClick={onClose}><IoCloseSharp /></div>
            </div>
            <form className='grid p-4 gap-2 overflow-y-auto h-full'>
                <label htmlFor='productName'>Product Name</label>
                <input type='text' id='productName' name='productName' value={data.productName} placeholder='Enter Product Name' onChange={handleOnChange} className='p-1 bg-slate-200 border rounded'></input>
                <label htmlFor='brandName'>Brand Name</label>
                <input type='text' id='brandName' name='brandName' value={data.brandName} placeholder='Enter Brand Name' onChange={handleOnChange} className='p-1 bg-slate-200 border rounded'></input>
                <label htmlFor='category'>Category</label>
                <select name='category' value={data.category} className='p-1 bg-slate-200 border rounded'>
                    {
                        ProductCategory.map((ele,index)=>{
                            return(
                                <option value={ele.value} key={ele.value+index}>{ele.label}</option>
                            )
                        })
                    }
                </select>
                <label htmlFor='productImage'>Product Image</label>
                <div className='p-2 bg-slate-200 rounded h-48 w-'>
                    Product Image
                </div>
                <label htmlFor='description'>Description </label>
                <input type='text' id='description' name='description' value={data.description} placeholder='Enter description' onChange={handleOnChange} className='p-1 bg-slate-200 border rounded'></input>
                <label htmlFor='price'>Price</label>
                <input type='text' id='price' name='price' value={data.price} placeholder='Enter price' onChange={handleOnChange} className='p-1 bg-slate-200 border rounded'></input>
                <label htmlFor='selling'>Selling</label>
                <input type='text' id='selling' name='selling' value={data.selling} placeholder='Enter selling Price' onChange={handleOnChange} className='p-1 bg-slate-200 border rounded'></input>
            </form>
        </div>
    </div>
  )
}
export default UploadProducts