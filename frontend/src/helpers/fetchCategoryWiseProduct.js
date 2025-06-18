import summaryApi from "../common"

const fetchCategoryWiseProduct=async(category)=>{
    const dataResponse=await fetch(summaryApi.categoryProductWise.url,{
        method:summaryApi.categoryProductWise.method,
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            category:category
        })
    })
    const response=await dataResponse.json()
    return response
}
export default fetchCategoryWiseProduct;