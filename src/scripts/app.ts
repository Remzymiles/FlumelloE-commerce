import { homepageElems } from "./homepage/homepageHtmlElems";
import { homepageImports } from "./homepageImports";
import { IProduct } from "./interface/IProduct";
import { handleSlider } from "./homepage/autoSlider";
import { handleProductCardArrows } from "./utility/ProductCardArrows";
import { homepageSearchFuncsAndFetchApi } from "./homepage/homepageSearchFuncsAntFetchApi";
import { handleRedirectIfUserIsNotLoggedIn } from "./utility/redirectIfUserIsNotLoggedIn";

//


// imports
const {
  displaySearchedProducts,
  handleLogout,
  handleDropdownButtonStatus,
  handleCartIcon,
} = homepageImports

//getting elements from html
const {
  signUpBtnElem,
  logInBtnElem,
  logOutBtnElem,
  searchBarInputElem,
  searchedItemsContainerElem,
  searchErrorMsg,
  arrow,
  productCardsGroupOne,
  productCardsGroupTwo,
  productCardsGroupThree,
  productCardsGroupFour,
  loader,
  cartQuantity
} = homepageElems
// 


// global variables
let products: IProduct[];
//

//handle redirect if user isn't logged in
handleRedirectIfUserIsNotLoggedIn()
//

// handle cart icon
handleCartIcon(cartQuantity);

//handle dropdown links
handleDropdownButtonStatus(signUpBtnElem, logInBtnElem);
//

// handle search box
homepageSearchFuncsAndFetchApi()
// 

// handle animated slider and its arrows for manual swipe
handleSlider()
//


// handle image card arrows
handleProductCardArrows()
// 

//
logOutBtnElem.addEventListener("click", handleLogout);
