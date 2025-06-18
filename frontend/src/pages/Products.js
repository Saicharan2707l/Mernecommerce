import React, { useEffect, useState } from 'react';
import UploadProducts from '../components/UploadProducts';
import summaryApi from '../common';
import AdminProductCard from '../components/AdminProductCard';

const Products = () => {
  const [openUpdateProduct, setOpenUpdateProduct] = useState(false);
  const [allProduct,setAllProduct]=useState([])

  const fetchAllproduct=async()=>{
    console.log("Starting to fetch products...");
    try {
      const response=await fetch(summaryApi.allProducts.url)
      const dataResponse=await response.json()
      setAllProduct(dataResponse?.data || [])
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
  useEffect(()=>{
    fetchAllproduct()
  },[])
  return (
    <div>
      <div className='p-2 bg-white flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Products</h2>  
        <button 
          className='border py-2 px-4 rounded-full overflow-hidden bg-red-500 hover:bg-red-700 transition-all hover:text-white' 
          onClick={() => setOpenUpdateProduct(true)}
        >
          Upload Product
        </button>      
      </div> 

      <div className='flex-1 overflow-y-auto flex-col h-screen'>
        <div className='flex items-center flex-wrap gap-5 p-4'>
          {
            allProduct.map((product,index)=>{
              return(
                  <AdminProductCard product={product} key={index+'allProduct'} fetchAllproduct={fetchAllproduct}/>
              )
            })
          }
        </div>
      </div>  
      {
      openUpdateProduct && 
      <UploadProducts onClose={() => setOpenUpdateProduct(false)} fetchAllproduct={fetchAllproduct} />}
    </div>
  );
};

export default Products;
