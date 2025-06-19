import React, { useCallback, useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import summaryApi from '../common'
import { FaStar } from 'react-icons/fa'
import { FaStarHalf } from 'react-icons/fa'
import dispalyINRCurrency from '../helpers/displayCurrency'
import VerticalProduct from '../components/VerticalProduct'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'
import addToCart from '../helpers/addToCart'
import Context from '../context'

const ProductCard = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    description: "",
    productImage: [],
    price: "",
    selling: ""
  })
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const newProductListLoading = new Array(4).fill(null)
  const [activeImage, setActiveImage] = useState("")
  const context = useContext(Context)
  const fetchproductDetails = async () => {
    setLoading(true)
    const response = await fetch(summaryApi.productDetails.url, {
      method: summaryApi.productDetails.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        productId: params?.id
      })
    })
    setLoading(false)
    const dataresponse = await response.json()
    console.log("product card details for each response", dataresponse)
    setData(dataresponse?.data)
    setActiveImage(dataresponse?.data?.productImage[0])
  }
  useEffect(() => {
    fetchproductDetails()
  }, [params])

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL)
  }
  const [zoomImage, setZoomImage] = useState({
    x: 0, y: 0
  })
  const [zoomin, setZoomin] = useState(false)
  const handleZoomImage = useCallback((e) => {
    setZoomin(true)
    const { left, top, width, height } = e.target.getBoundingClientRect()
    const x = (e.clientX - left) / width
    const y = (e.clientX - top) / height
    setZoomImage({ x, y })
  }, [])
  const handleMouseLeave = () => {
    setZoomin(false)
  }
  const handleAddToCart = async (e) => {
    await addToCart(e, data?._id)
    if (context?.fetchUserAddToCart) context.fetchUserAddToCart()
  }
  return (
    <div className='container mx-auto p-4'>
      <div className='min-h-[200px] flex flex-col lg:flex-row gap-8'>
        {/* Product Image and Details Card */}
        <div className='flex flex-col lg:flex-row gap-8 w-full bg-white rounded-2xl shadow-lg p-6'>
          {/* Product Images */}
          <div className='flex flex-col gap-4 items-center'>
            <div className='h-[320px] w-[320px] bg-slate-100 rounded-xl shadow flex items-center justify-center relative'>
              <img src={activeImage} className='h-72 w-72 object-contain mix-blend-multiply transition-all duration-300' onMouseMove={handleZoomImage} onMouseLeave={handleMouseLeave} alt={data?.productName} />
              {/* Product Zoom */}
              {zoomin && (
                <div className='hidden lg:block absolute min-w-[400px] min-h-[400px] bg-slate-200 p-1 -right-[410px] top-0 rounded-xl shadow-xl z-20'>
                  <div className='w-full h-full min-h-[500px] min-w-[500px] mix-blend-multiply overflow-hidden rounded-xl'
                    style={{ backgroundImage: `url(${activeImage})`, backgroundRepeat: "no-repeat", backgroundPosition: `${zoomImage.x * 100}% ${zoomImage.y * 100}%` }}>
                  </div>
                </div>
              )}
            </div>
            {/* Thumbnails */}
            <div className='flex gap-2 mt-2'>
              {loading ? (
                newProductListLoading.map((_, idx) => (
                  <div className='bg-slate-200 h-16 w-16 rounded-lg animate-pulse' key={"loadingimage"+idx}></div>
                ))
              ) : (
                data?.productImage?.map((imageURL, index) => (
                  <div className={`h-16 w-16 rounded-lg border-2 cursor-pointer transition-all duration-200 ${activeImage === imageURL ? 'border-red-500 shadow-lg' : 'border-slate-200'}`} key={imageURL} onMouseEnter={() => handleMouseEnterProduct(imageURL)} onClick={() => handleMouseEnterProduct(imageURL)}>
                    <img src={imageURL} className='h-full w-full object-contain p-1 mix-blend-multiply' alt={data?.productName + " thumbnail"} />
                  </div>
                ))
              )}
            </div>
          </div>
          {/* Product Details */}
          <div className='flex-1 flex flex-col justify-between gap-4'>
            {loading ? (
              <div className='flex flex-col w-full gap-4'>
                <div className='bg-slate-200 h-6 w-32 rounded-full animate-pulse'></div>
                <div className='bg-slate-200 h-8 w-2/3 rounded-full animate-pulse'></div>
                <div className='bg-slate-200 h-4 w-24 rounded-full animate-pulse'></div>
                <div className='bg-slate-200 h-6 w-1/2 rounded-full animate-pulse'></div>
                <div className='bg-slate-200 h-8 w-1/3 rounded-full animate-pulse'></div>
                <div className='bg-slate-200 h-10 w-full rounded-lg animate-pulse'></div>
              </div>
            ) : (
              <div className='flex flex-col gap-3'>
                <span className='bg-red-100 text-red-600 rounded-full px-3 py-1 text-xs font-semibold w-fit mb-1'>{data?.brandName}</span>
                <h2 className='text-3xl font-bold text-slate-800 mb-1'>{data?.productName}</h2>
                <p className='capitalize text-slate-500 text-base mb-2'>{data?.category}</p>
                <div className='flex items-center gap-1 text-red-500 mb-2'>
                  <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalf />
                  <span className='ml-2 text-slate-500 text-sm'>(4.5/5)</span>
                </div>
                <div className='flex items-end gap-4 mb-2'>
                  <span className='text-2xl font-bold text-red-600'>{dispalyINRCurrency(data?.selling)}</span>
                  <span className='text-lg line-through text-slate-400'>{dispalyINRCurrency(data?.price)}</span>
                </div>
                <div className='flex gap-4 mb-4'>
                  <button className='bg-red-600 text-white rounded-full px-8 py-2 font-semibold text-lg shadow hover:bg-red-700 transition-all'>Buy</button>
                  <button className='bg-white border-2 border-red-600 text-red-600 rounded-full px-8 py-2 font-semibold text-lg shadow hover:bg-red-600 hover:text-white transition-all' onClick={handleAddToCart}>Add to Cart</button>
                </div>
                <div className='bg-slate-50 rounded-xl p-4 shadow-inner'>
                  <p className='font-semibold text-slate-700 mb-1'>Description:</p>
                  <p className='text-slate-600'>{data?.description}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <CategoryWiseProductDisplay category={data?.category} heading={"Recommended Product"} />
    </div>
  )
}
export default ProductCard