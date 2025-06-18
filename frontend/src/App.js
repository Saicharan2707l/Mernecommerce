import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect, useState } from 'react';
import summaryApi from './common';
import Context from './context';
import {useDispatch} from 'react-redux';
import { setUserDetails } from './store/userSlice';

function App() {
  const dispatch=useDispatch()
  const [cartProductCount,setCartProductCount]=useState(0)
  const fetchUserDetails = async () => {
    const dataResponse = await fetch(summaryApi.current_user.url, {
      method: summaryApi.current_user.method,
      credentials: "include"
    })
    const dataapi = await dataResponse.json();
    if(dataapi.success){
      dispatch(setUserDetails(dataapi.data))
    }
  }
  const fetchUserAddToCart=async()=>{
    const dataResponse=await fetch(summaryApi.countAddToCartProduct.url,{
      method:summaryApi.countAddToCartProduct.method,
      credentials:"include"
    })
    const dataapi=await dataResponse.json()
    setCartProductCount(dataapi?.data?.count)
  }
  useEffect(() => {
    fetchUserDetails()
    fetchUserAddToCart()
  }, [])
  return (
    <>
      <Context.Provider value={{
        fetchUserDetails,
        cartProductCount,
        fetchUserAddToCart
      }}>
        <ToastContainer position='top-center' />
        <Header />
        <main className='min-h-[calc(100vh-110px)] pt-16'>
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}
export default App;
