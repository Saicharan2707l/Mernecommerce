import summaryApi from "../common"
import { toast } from 'react-toastify';

const addToCart=async(e,id)=>{
    e.preventDefault()
    e.stopPropagation()

    const response=await fetch(summaryApi.addToCart.url,{
        method:summaryApi.addToCart.method,
        credentials:"include",
        headers:{
            "content-type":"application/json",
        },
        body:JSON.stringify(
            {productId:id}
        )
    })
    const dataResponse=await response.json()
    console.log("dataResponse of Cart",dataResponse)
    if(dataResponse.success){
        toast.success(dataResponse.message)
    }
    if(dataResponse.error){
        toast.error(dataResponse.message)
    }
    return dataResponse
}
export default addToCart