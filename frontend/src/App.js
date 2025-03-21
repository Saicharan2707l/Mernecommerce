import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react';
import summaryApi from './common';
import Context from './context';
import {useDispatch} from 'react-redux';
import { setUserDetails } from './store/userSlice';
function App() {
  const dispatch=useDispatch()
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
  useEffect(() => {
    fetchUserDetails()
  }, [])
  return (
    <>
      <Context.Provider value={{
        fetchUserDetails
      }}>
        <ToastContainer />
        <Header />
        <main className='min-h-[calc(100vh-110px)]'>
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}
export default App;
