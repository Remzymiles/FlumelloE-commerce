import { checkoutHtmlElems } from "./checkoutPage/checkoutPageHtmlElems";
import { checkoutImports } from "./checkoutPage/checkoutImports";
import { IProduct } from "./interface/IProduct";
import { handlePriceCalculationAndDisplay } from "./checkoutPage/calculateAndShowCheckoutPrice";
import { searchFuncsAndFetchApi } from "./handleSearchFuncsAndFetchApiForSearch";
import { handleRedirectIfUserIsNotLoggedIn } from "./utility/redirectIfUserIsNotLoggedIn";
import { handlePayment } from "./checkoutPage/handleInputs";
// 

const {
  handleCartIcon,
  handleLogout,
  handleDropdownButtonStatus
} = checkoutImports
// 
const {
  logOutBtnElem,
  payBtnElem,
} = checkoutHtmlElems

// 

// redirect to login page if user isn't logged in
handleRedirectIfUserIsNotLoggedIn()

// handle search box
searchFuncsAndFetchApi()


// handle cart icon
handleCartIcon()

//handle dropdown links
handleDropdownButtonStatus();
// 



//handle checkout pricing
handlePriceCalculationAndDisplay()


// 
payBtnElem.addEventListener("click", handlePayment)
logOutBtnElem.addEventListener("click", handleLogout);