import { checkoutHtmlElems } from "./checkoutPage/checkoutPageHtmlElems";
import { checkoutImports } from "./checkoutPage/checkoutImports";
import { IProduct } from "./interface/IProduct";
import { handlePriceCalculationAndDisplay } from "./checkoutPage/calculateAndShowCheckoutPrice";
import { searchFuncsAndFetchApi } from "./handleSearchFuncsAndFetchApiForSearch";
import { handleRedirectIfUserIsNotLoggedIn } from "./utility/redirectIfUserIsNotLoggedIn";
// 

const {
  handleCartIcon,
  handleLogout,
  handleDropdownButtonStatus
} = checkoutImports
// 
const {
  signUpBtnElem,
  logInBtnElem,
  logOutBtnElem,
  fullnameInputElem,
  emailInputElem,
  telephoneElem,
  addressElem,
  payBtnElem,
  cartQuantity,
  paymentSuccessModal,
  searchBarContainer,
  searchBarInputElem,
  searchSectionContainer,
  closeSearchIcon,
  searchedItemsContainerElem,
  searchErrorMsg,
} = checkoutHtmlElems

// 
let checkoutProducts = JSON.parse(localStorage.getItem("checkoutProducts"))
let productHistory = JSON.parse(localStorage.getItem("productHistory")) || [];
let getFullnameInput: string;
let getEmailInput: string;
let getAddressInput: string;
let getTelephoneInput: string;
let emailRegex: RegExp = /^[a-zA-Z0-9_-]+@[a-zA-z0-9-]+\.[a-z]{2,4}$/;
let mobileNumberRegex: RegExp = /^(\+234|0)[789][01]\d{8}$/
let products: IProduct[]
// 

// redirect to login page if user isn't logged in
handleRedirectIfUserIsNotLoggedIn()

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

// handle cart icon
handleCartIcon(cartQuantity)

//handle dropdown links
handleDropdownButtonStatus(signUpBtnElem,logInBtnElem);
// 


//get user details 
const handleTelephoneNum:EventListener = (e:Event) => {
  const telephoneInput = e.target as HTMLInputElement;
  getTelephoneInput = telephoneInput.value;
  localStorage.setItem("userTelephone", JSON.stringify(getTelephoneInput))
}
// 
const handleUserAddress:EventListener = (e:Event) => {
  const addressInput = e.target as HTMLInputElement;
  getAddressInput = addressInput.value;
  localStorage.setItem("userAddress", JSON.stringify(getAddressInput))
}
//

const handleFullname:EventListener = (e:Event) => {
  const fullnameInput = e.target as HTMLInputElement;
  getFullnameInput = fullnameInput.value;
  console.log(getFullnameInput);
  
}
// 
const handleUserEmail:EventListener = (e:Event) => {
  const emailInput = e.target as HTMLInputElement;
  getEmailInput = emailInput.value;
  console.log(getEmailInput);
} 
// 

// input checks
const emailCheck:Function = () =>{
  if(!emailRegex.test(getEmailInput)){
    emailInputElem.classList.add("checkout_input_error")
  }else{
    emailInputElem.classList.remove("checkout_input_error")
  }
}

const telephoneCheck:Function = () =>{
  if(!mobileNumberRegex.test(getTelephoneInput)){
    telephoneElem.classList.add("checkout_input_error")
  }else{
    telephoneElem.classList.remove("checkout_input_error")
  }
}

const nameCheck:Function = () =>{
  if(!getFullnameInput){
    fullnameInputElem.classList.add("checkout_input_error")
  }else{
    fullnameInputElem.classList.remove("checkout_input_error")
  }
}

const addressCheck:Function = () =>{
  if(!getAddressInput){
    addressElem.classList.add("checkout_input_error")
  }else{
    addressElem.classList.remove("checkout_input_error")
  }
}
// 

//handle checkout pricing
handlePriceCalculationAndDisplay(checkoutProducts)

// handle pay button 
const handlePayBtn: EventListener = (e: Event): void =>{
  emailCheck()
  telephoneCheck()
  nameCheck()
  addressCheck()
  
  if(getFullnameInput && emailRegex.test(getEmailInput) && getAddressInput && mobileNumberRegex.test(getTelephoneInput)){
    checkoutProducts.forEach(product =>{
      const singleProduct = {
        productId: product.checkoutProductId,
        image: product.checkoutImage,
        productName: product.checkoutProductName,
        productPrice: product.checkoutProductPrice,
        productStock: product.checkoutProductStock,
        productDiscountPercentage: product.checkoutProductDiscountPercentage,
        productQuantity: Number(product.checkoutProductQuantity),
      };
      productHistory.push(singleProduct);
      localStorage.setItem("productHistory", JSON.stringify(productHistory))
      
      product.isProductFromCart === true ? localStorage.removeItem("addProductsToCart") : null;
      paymentSuccessModal.classList.add("block_elem")

      // handle cart icon
       cartQuantity.classList.add("none_elem")
    })
  }
}

// getting product from API

// 
fullnameInputElem.addEventListener("change",handleFullname)
emailInputElem.addEventListener("change",handleUserEmail)
telephoneElem.addEventListener("change",handleTelephoneNum)
addressElem.addEventListener("change",handleUserAddress)
payBtnElem.addEventListener("click", handlePayBtn)
logOutBtnElem.addEventListener("click", handleLogout);