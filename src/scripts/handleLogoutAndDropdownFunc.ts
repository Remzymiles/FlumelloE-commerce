import { storedUserLoginStatus } from "./saveToLocalStorage";




export const handleLogout = () => {
    let isUserLoggedIn: boolean = false;
    
    localStorage.setItem("isUserLoggedIn", JSON.stringify(isUserLoggedIn));
};



export const handleDropdownButtonStatus = (signUpBtnElem,logInBtnElem) => {
    if (storedUserLoginStatus === true) {
        signUpBtnElem.classList.add("none_elem")
        logInBtnElem.classList.add("none_elem")
    } else {
        signUpBtnElem.classList.remove("none_elem")
        logInBtnElem.classList.remove("none_elem")
    }
};


export const handleCartIcon = (cartQuantity) =>{
    let addProductsToCart = JSON.parse(localStorage.getItem("addProductsToCart")) || [];
    cartQuantity.innerHTML = addProductsToCart.length;
    addProductsToCart.length === 0 || null ? cartQuantity.classList.add("none_elem"): cartQuantity.classList.remove("none_elem")
}