import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Forgotpassword from "../pages/Forgotpassword";
import Signup from "../pages/Signup";
import AdminPanel from "../pages/AdminPanel";
import { AllUsers } from "../pages/AllUsers";
import Products from "../pages/Products";
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
        }
        

]
    }]
)
export default router;