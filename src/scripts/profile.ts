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
  signUpBtnElem,
  logInBtnElem,
  logOutBtnElem,
  cartQuantity,
  searchBarContainer,
  searchBarInputElem,
  searchSectionContainer,
  closeSearchIcon,
  searchedItemsContainerElem,
  searchErrorMsg
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
searchFuncsAndFetchApi({
  products,
  searchBarContainer,
  searchBarInputElem,
  searchSectionContainer,
  closeSearchIcon,
  searchedItemsContainerElem,
  searchErrorMsg,
})

// getting user details
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
handleCartIcon(cartQuantity)


//handle dropdown links
handleDropdownButtonStatus(signUpBtnElem,logInBtnElem);
//


profileName()
userEmail()
userAddress()
userNumber()


// 

// 
logOutBtnElem.addEventListener("click", handleLogout);