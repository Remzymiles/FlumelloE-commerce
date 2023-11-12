import { IProduct } from "./interface/IProduct";
import { profileHtmlElems } from "./profile/profilePageHtmlElems";
import { profilePageImports } from "./profilePageImports";

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
  displaySearchedProducts,
  handleLogout,
  handleDropdownButtonStatus,
  handleCartIcon
} = profilePageImports

// global variables
let addProductsToCart = JSON.parse(localStorage.getItem("addProductsToCart")) || [];
let getSearchInput: string;
let products: IProduct[];

// 




// handling logout button
storedUserLoginStatus === null || storedUserLoginStatus === false
  ? (window.location.href = "./sign-up.html")
  : null;

//

// handle search box
const handleSearchBox: EventListener = (e: Event): void => {
  e.preventDefault();
  //
  getSearchInput
  ? searchSectionContainer.classList.add("block_elem")
  : searchSectionContainer.classList.remove("block_elem")
  // 
  handleGetProductFromApi();
};
//

// get user input
const handleSearchBoxInput: EventListener = (e: Event): void => {
  const searchInput = e.target as HTMLInputElement;
  getSearchInput = searchInput.value;
};
//

// close the search section when the x icon is clicked
const handleClosingSearchSection: EventListener = (): void => {
  searchSectionContainer.classList.add("none_elem");
};
//


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

// getting product from API
const handleGetProductFromApi = async () => {
  
  try {
    const res = await fetch(`https://dummyjson.com/products`);
    const data = await res.json();
    products = data.products;
    
    displaySearchedProducts(
      products,
      searchBarInputElem.value.toLowerCase(),
      searchedItemsContainerElem,
      searchErrorMsg
      );
  } catch (error) {
    console.log(error);
  }
};
// 

// 
logOutBtnElem.addEventListener("click", handleLogout);
searchBarInputElem.addEventListener("change", handleSearchBoxInput);
closeSearchIcon.addEventListener("click", handleClosingSearchSection);
searchBarContainer.addEventListener("submit", handleSearchBox);