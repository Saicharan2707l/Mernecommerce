import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";
import { FaCloudUploadAlt } from "react-icons/fa";
import ProductCategory from '../helpers/ProductCategory';
import uploadProduct from '../helpers/uploadProduct';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import summaryApi from '../common';
import { toast } from 'react-toastify';

const AdminEditProduct = ({
    onClose,
    ProductData,
    fetchAllproduct
}) => {
    const [data, setData] = useState({
        ...ProductData,
        productName: ProductData?.productName,
        brandName: ProductData?.brandName,
        category: ProductData?.category,
        productImage: ProductData?.productImage || [],
        description: ProductData?.description,
        price: ProductData?.price,
        selling: ProductData?.selling
    })
    
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            [name]: value
        }));
    }
    
    const [fullScreenImage, setfullSreenImage] = useState("")
    const [openfullScreenImage, setopenfullSreenImage] = useState(false)
    
    const handleUploadProduct = async(e) => {
        const file = e.target.files[0];
        setfullSreenImage(file.name)
        const uploadImageCloudinary = await uploadProduct(file)
        setData((preve) => {
            return {
                ...preve,
                productImage: [...preve.productImage, uploadImageCloudinary.url]
            }
        })
    }
    const handleDeleteProductImage=async(index)=>{
        const newProductImage=[...data.productImage]
        newProductImage.splice(index,1)
        setData((preve) => {
            return {
                ...preve,
                productImage: [...newProductImage]
            }
        })

    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const dataresponse=await fetch(summaryApi.updateProduct.url,{
            method:summaryApi.updateProduct.method,
            credentials:'include',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(data)
        })
        const responsedata= await dataresponse.json();
        if(responsedata.success){
            toast.success(responsedata.message)
            onClose()
            fetchAllproduct()
        }
        if(responsedata.error){
            toast.error(responsedata.error)
        }
    }
  return (
    <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
                <div className='flex justify-between items-center pb-3'>
                    <h2 className='font-bold text-lg'>Edit Product</h2>
                    <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                        <CgClose/>
                    </div>
                </div>                
                <form className='overflow-y-scroll h-full pb-3 px-4' onSubmit={handleSubmit}>
                    <div className='space-y-3'>
                        <div className='space-y-1'>
                            <label htmlFor='productName' className='block text-sm font-medium'>Product Name:</label>
                            <input 
                                type='text' 
                                id='productName' 
                                placeholder='Enter product name' 
                                name='productName'
                                value={data.productName} 
                                onChange={handleOnChange}
                                className='p-2 bg-slate-100 border rounded w-full'
                                required
                            />
                        </div>                        
                        <div className='space-y-1'>
                            <label htmlFor='brandName' className='block text-sm font-medium'>Brand Name:</label>
                            <input 
                                type='text' 
                                id='brandName' 
                                placeholder='Enter brand name' 
                                value={data.brandName} 
                                name='brandName'
                                onChange={handleOnChange}
                                className='p-2 bg-slate-100 border rounded w-full'
                                required
                            />
                        </div>
                        
                        <div className='space-y-1'>
                            <label htmlFor='category' className='block text-sm font-medium'>Category:</label>
                            <select 
                                required 
                                value={data.category} 
                                name='category' 
                                onChange={handleOnChange} 
                                className='p-2 bg-slate-100 border rounded w-full'
                            >
                                <option value={""}>Select Category</option>
                                {ProductCategory.map((el, index) => (
                                    <option value={el.value} key={el.value+index}>{el.label}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div className='space-y-1'>
                            <label htmlFor='productImage' className='block text-sm font-medium'>Product Image:</label>
                            <label htmlFor='uploadProductImage' className='block hover:cursor-pointer'>
                                <div className='p-2 bg-slate-200 rounded h-32 w-full flex items-center justify-center'>                    
                                    <div className='text-slate-500 flex-col items-center justify-center flex'>
                                        <span className='text-3xl'><FaCloudUploadAlt /></span>
                                        <p className='text-xm'>Upload Product Image</p>
                                        <input type='file' id='uploadProductImage' name='uploadProductImage' className='hidden' onChange={handleUploadProduct}></input>
                                    </div>                    
                                </div>
                            </label>
                            
                            <div className='mt-2'>
                                {
                                data?.productImage?.length > 0 ? (
                                    <div className='flex flex-wrap gap-2'>
                                        {data.productImage.map((el, idx) => (
                                            <div className='relative inline-block group'>
                                                <img
                                                    src={el}
                                                    alt={`product-${idx}`}
                                                    key={idx}
                                                    width={80}
                                                    height={80}
                                                    className="bg-slate-100 border hover:cursor-pointer object-cover"
                                                    required
                                                    onClick={() => {
                                                        setopenfullSreenImage(true)
                                                        setfullSreenImage(el)
                                                    }}
                                                />
                                                <div className='absolute bottom-0 right-0 text-white bg-red-600 rounded-full p-1 cursor-pointer hidden group-hover:block' onClick={()=>handleDeleteProductImage(idx)}>                                                    
                                                    <MdDelete/>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) 
                                : (
                                    <p className='text-red-600 text-xs'>No Image Uploaded</p>
                                )}                
                            </div>
                        </div>
                        <div className='space-y-1'>
                            <label htmlFor='description' className='block text-sm font-medium'>Description:</label>
                            <textarea
                                id='description'
                                placeholder='Enter product description'
                                name='description'
                                value={data.description}
                                onChange={handleOnChange}
                                className='p-2 bg-slate-100 border rounded w-full resize:none'
                                rows={3}
                                required
                            />
                        </div>
                        
                        <div className='space-y-1'>
                            <label htmlFor='price' className='block text-sm font-medium'>Price:</label>
                            <input
                                type='number'
                                id='price'
                                placeholder='Enter price'
                                name='price'
                                value={data.price}
                                onChange={handleOnChange}
                                className='p-2 bg-slate-100 border rounded w-full'
                                required
                            />
                        </div>
                        
                        <div className='space-y-1'>
                            <label htmlFor='selling' className='block text-sm font-medium'>Selling Price:</label>
                            <input
                                type='number'
                                id='selling'
                                placeholder='Enter selling price'
                                name='selling'
                                value={data.selling}
                                onChange={handleOnChange}
                                className='p-2 bg-slate-100 border rounded w-full'
                                required
                            />
                        </div>
                        
                        <div className='pt-3'>
                            <button 
                                type='submit'
                                className='mb-10 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-800 w-full'
                            >
                                Edit Product
                            </button>
                        </div>
                        
                      
                    </div>
                    
                </form>
            </div>
            {
                          openfullScreenImage&&(
                            <DisplayImage imgUrl={fullScreenImage} onClose={()=>{setopenfullSreenImage(false)}}/>
                          )
        }
        </div>
  )
}

export default AdminEditProduct