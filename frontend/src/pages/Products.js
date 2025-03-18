import React, { useState } from 'react';
import UploadProducts from '../components/UploadProducts';

const Products = () => {
  const [openUpdateProduct, setOpenUpdateProduct] = useState(false);

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
      {openUpdateProduct && <UploadProducts onClose={() => setOpenUpdateProduct(false)} />}
    </div>
  );
};

export default Products;
