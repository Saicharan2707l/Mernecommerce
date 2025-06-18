import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalProduct from '../components/VerticalProduct'


const Home = () => {
  return(
    <div>
      <CategoryList/>
      <BannerProduct/>
      <HorizontalCardProduct category={"airpods"} heading={"Trending Airpods"}/>
      <HorizontalCardProduct category={"mobiles"} heading={"Popular Mobiles"}/>
      <VerticalProduct category={"earphones"} heading={"Earphones"}/>
      <VerticalProduct category={"mouse"} heading={"Mouse"}/>
      <VerticalProduct category={"printers"} heading={"Printers"}/>
      <VerticalProduct category={"processor"} heading={"Processor"}/>
      <VerticalProduct category={"refrigerator"} heading={"Refrigerator"}/>
    </div>
  )
}
export default Home