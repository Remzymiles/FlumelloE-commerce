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