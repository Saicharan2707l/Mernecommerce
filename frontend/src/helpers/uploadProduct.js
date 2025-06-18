const url=`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`
const uploadProduct = async(img) => {
  const formData=new FormData()
  formData.append("file",img)
  formData.append("upload_preset","ecommerce_product")
  const dataResponse=await fetch(url,{
    method:"post",
    body:formData
  })
  return dataResponse.json()
}
export default uploadProduct