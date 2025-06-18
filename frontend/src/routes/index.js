import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Forgotpassword from "../pages/Forgotpassword";
import Signup from "../pages/Signup";
import AdminPanel from "../pages/AdminPanel";
import { AllUsers } from "../pages/AllUsers";
import Products from "../pages/Products";
import CategoryProduct from "../pages/CategoryProduct";
import ProductCard from "../pages/ProductCard";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";

const router=createBrowserRouter(

    [{
        path : "/",
        element:<App/>,
        children:[
        {
            path:"",
            element:<Home/>
        },
        {
            path:"login",
            element:<Login/>
        },
        {
            path:"forgot-password",
            element:<Forgotpassword/>
        },
        {
            path:"sign-up",
            element:<Signup/>
        },
        {
            path:"product-category/",
            element:<CategoryProduct/>
        },
        {
            path:"product/:id",
            element:<ProductCard/>
        },
        {
            path:"cart",
            element:<Cart/>
        },
        {
            path:"search",
            element:<SearchProduct/>
        },
        {
            path:'admin-panel',
            element:<AdminPanel/>,
            children:
            [
                {
                path:"all-users",
                element:<AllUsers/>
            },
            {
                path:"all-products",
                element:<Products/>
            }
            
        ]
        },
        
]
    }]
)
export default router;