// save user detail to local storage
export const userData = () => {
     const userJson = JSON.parse(localStorage.getItem("user"));  
     return userJson
} 


// save user login status to local storage
export const storedUserLoginStatus = JSON.parse(localStorage.getItem("isUserLoggedIn"))