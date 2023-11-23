import { searchFuncsAndFetchApi } from "./handleSearchFuncsAndFetchApiForSearch";
import { IProduct } from "./interface/IProduct";
import { profileHtmlElems } from "./profilePage/profilePageHtmlElems";
import { profilePageImports } from "./profilePage/profilePageImports";

// 
const {
  acctNameElem,
  userEmailElem,
  userTelElem,
  userAddressElem,
  logOutBtnElem,
} = profileHtmlElems
// 

const {
  userData,
  storedUserLoginStatus,
  handleLogout,
  handleDropdownButtonStatus,
  handleCartIcon,
  handleRedirectIfUserIsNotLoggedIn
} = profilePageImports

// global variables
let products: IProduct[];

// 

// redirect to login page if user isn't logged in
handleRedirectIfUserIsNotLoggedIn()
//

// handle search box
searchFuncsAndFetchApi()


// setting user details
const profileName:Function = () => {
  acctNameElem.innerText = `${userData().lastName} ${userData().firstName}`
}
const userEmail:Function = () => {
  userEmailElem.innerText = `${userData().email}`
}
const userNumber:Function = () => {
  const getNumberInput = JSON.parse(localStorage.getItem("userTelephone"))
  userTelElem.innerText = `${getNumberInput}`
}
const userAddress:Function = () => {
  const getAddressInput = JSON.parse(localStorage.getItem("userAddress"))
  userAddressElem.innerText = `${getAddressInput}`
}
// 


// handle cart icon
handleCartIcon()


//handle dropdown links
handleDropdownButtonStatus();
//


profileName()
userEmail()
userAddress()
userNumber()


// 

// 
logOutBtnElem.addEventListener("click", handleLogout);