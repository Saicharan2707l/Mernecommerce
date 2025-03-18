const backendDomain="http://localhost:8000"
const summaryApi={
    signUp:{
        url:`${backendDomain}/api/signup`,
        method:"post"
    },
    signIn:{
        url:`${backendDomain}/api/signin`,
        method:'post'
    },
    current_user:{
        url:`${backendDomain}/api/user-details`,
        method:'get'
    },
    userLogout:{
        url:`${backendDomain}/api/userLogout`,
        method:'get'
    },
    all_user:{
        url:`${backendDomain}/api/all-users`,
        method:'get'
    },
    update_user:{
        url:`${backendDomain}/api/updateUser`,
        method:'post'
    }
}
export default summaryApi;