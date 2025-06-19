import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import ProductCategory from '../helpers/ProductCategory'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'
import VerticalProduct from '../components/VerticalProduct'
import VerticalCard from '../components/VerticalCard'
import summaryApi from '../common'

const CategoryProduct = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const urlSearch = new URLSearchParams(location.search)
  const urlCategoryListInArray = urlSearch.getAll("category");
  const urlCategoryListObject = {}
  urlCategoryListInArray.forEach(element => {
    urlCategoryListObject[element] = true;
  });
  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject)
  const [filterCategorylist, setFilterCategorylist] = useState([])
  const [sortBy,setsortBY]=useState("")
  const fetchData = async () => {
    const response = await fetch(summaryApi.filterProduct.url, {
      method: summaryApi.filterProduct.method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        category: filterCategorylist
      })
    })
    const dataResponse = await response.json()
    setData(dataResponse.data || [])
  }
  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target
    setSelectCategory((preve) => {
      return {
        ...preve,
        [value]: checked
      }
    })
  }
  useEffect(() => {
    fetchData()
  }, [filterCategorylist])

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).map(categoryName => {
      if (selectCategory[categoryName]) {
        return categoryName
      }
      return null;

    }).filter(el => el)

    setFilterCategorylist(arrayOfCategory)
    const urlFormat = arrayOfCategory.map((el, index) => {
      if ((arrayOfCategory.length - 1) === index) {
        return `category=${el}`
      }
      return `category=${el}&&`

    })
    navigate("/product-category?" + urlFormat.join(""))
  }, [selectCategory])

  const handleonChangeSortBy=(e)=>{
      const {value}=e.target
      setsortBY(value)
      if(value==="asc"){
        setData(preve=>[...preve].sort((a,b)=>a.selling-b.selling))
      }
      if(value==="dsc"){
        setData(preve=>[...preve].sort((a,b)=>b.selling-a.selling))
      }
  }

  return (
    <div className='mx-auto container p-4'>
      {/* Responsive layout: mobile/tablet (flex-col), desktop (grid) */}
      <div className='flex flex-col gap-6 lg:grid lg:grid-cols-[260px,1fr] lg:gap-8'>
        {/* Sidebar: Sort/Filter */}
        <div className='bg-white p-4 rounded-xl shadow-md min-h-[120px] lg:min-h-[calc(100vh-140px)] w-full max-w-md mx-auto lg:mx-0'>
          {/* Sort by */}
          <div className='mb-6'>
            <h3 className='text-lg uppercase font-medium text-slate-500 border-b pb-1 border-slate-800'>Sort by</h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              <div className='flex gap-2 text-sm items-center'>
                <input type="radio" name="sortBy" value={"asc"} checked={sortBy==="asc"} onChange={handleonChangeSortBy} className="accent-red-600" />
                <label className="cursor-pointer">Price- Low to High</label>
              </div>
              <div className='flex gap-2 text-sm items-center'>
                <input type="radio" name="sortBy" value={"dsc"} checked={sortBy==="dsc"} onChange={handleonChangeSortBy} className="accent-red-600" />
                <label className="cursor-pointer">Price- High to Low</label>
              </div>
            </form>
          </div>
          {/* Filter by */}
          <div>
            <h3 className='text-lg uppercase font-medium text-slate-500 border-b pb-1 border-slate-800'>Filter by</h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              {
                ProductCategory.map((categoryName, index) => {
                  return (
                    <div className='flex items-center gap-2' key={categoryName.value}>
                      <input name={"category"} type="checkbox" checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory} className="accent-red-600" />
                      <label htmlFor={categoryName?.value} className="cursor-pointer">{categoryName?.label}</label>
                    </div>
                  )
                })
              }
            </form>
          </div>
        </div>
        {/* Product grid */}
        <div className='flex justify-center w-full'>
          <div className='bg-white rounded-xl shadow-md p-4 sm:p-6 w-full max-w-7xl mx-auto'>
            <p className='text-slate-800 text-lg font-medium mb-4'>Search Results: {data.length}</p>
            <div className='min-h-[200px] px-0 sm:px-2'>
              {
                data.length !== 0 && !loading && (
                  <VerticalCard data={data} loading={loading} />
                )
              }
              {
                data.length === 0 && !loading && (
                  <p className='text-center text-slate-500 py-8'>No products found for the selected category.</p>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryProduct