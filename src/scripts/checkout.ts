import "../styles/style.css"
import "font-awesome/css/font-awesome.css";
import "../assets/images/logo2.png";
import "../assets/images/flumello_favicon.png";
import { storedUserLoginStatus } from "./saveToLocalStorage";
import { IProduct } from "./IProduct";
import { displaySearchedProducts } from "./displaySearchFunction";
import { handleCartIcon } from "./handleLogoutAndDropdownFunc";
import { handleLogout } from "./handleLogoutAndDropdownFunc";
import { handleDropdownButtonStatus } from "./handleLogoutAndDropdownFunc";
// 


// 
const signUpBtnElem = document.querySelector<HTMLLinkElement>(".signup-btn");
const logInBtnElem = document.querySelector<HTMLElement>(".login-btn");
const logOutBtnElem = document.querySelector<HTMLElement>(".logout-btn");
const fullnameInputElem = document.querySelector<HTMLInputElement>("#name")
const emailInputElem = document.querySelector<HTMLInputElement>("#email")
const telephoneElem = document.querySelector<HTMLInputElement>("#telephone")
const addressElem = document.querySelector<HTMLInputElement>("#address")
const payBtnElem = document.querySelector<HTMLInputElement>(".pay")
const cartQuantity = document.querySelector<HTMLSpanElement>(".cart-link span");
const searchBarContainer = document.querySelector<HTMLFormElement>(".search_box");
const searchBarInputElem = document.querySelector<HTMLInputElement>("#search");
const searchSectionContainer = document.querySelector<HTMLDivElement>(".searched_item_container");
const closeSearchIcon = document.querySelector<HTMLElement>(".close_search_icon");
const searchedItemsContainerElem = document.querySelector<HTMLDivElement>(".search_items");
const searchErrorMsg = document.querySelector<HTMLDivElement>(".search_error_msg");
const checkoutPricingContainer = document.querySelector<HTMLDivElement>(".pricing")
const paymentSuccessModal = document.querySelector<HTMLDivElement>(".payment_modal")
const checkoutProductDetails = document.querySelector<HTMLDivElement>(".checkout_products")
const checkoutProductQuantity = document.querySelector<HTMLHeadingElement>(".checkout_quantity")

//

// global variables
let addProductsToCart = JSON.parse(localStorage.getItem("addProductsToCart")) || [];
let checkoutProducts = JSON.parse(localStorage.getItem("checkoutProducts"))
let productHistory = JSON.parse(localStorage.getItem("productHistory")) || [];
let getSearchInput: string;
let getFullnameInput: string;
let getEmailInput: string;
let getAddressInput: string;
let getTelephoneInput: string;
let products: IProduct[];
let emailRegex: RegExp = /^[a-zA-Z0-9_-]+@[a-zA-z0-9-]+\.[a-z]{2,4}$/;
let mobileNumberRegex: RegExp = /^(\+234|0)[789][01]\d{8}$/
// 


//
storedUserLoginStatus === null || storedUserLoginStatus === false
  ? (window.location.href = "./sign-up.html")
  : null;

//

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

// displaying the searched products
//


// 


//handle checkout pricing
const calculateTotalPrice: Function = () =>{
  let newPrice = 0
  let totalCost = 0
  let deliveryFee = 0

  checkoutProducts.forEach(product =>{
    // handle new price
    newPrice += (product.checkoutProductPrice * 520) * product.checkoutProductQuantity;
    // 

    // handle delivery fee
    newPrice <= 1000000 ? deliveryFee = 10000 : deliveryFee = 5000
    // 

    // handle total cost
    totalCost = newPrice + deliveryFee

  })
  // 
  
// handle display prices
checkoutPricingContainer.innerHTML = `
  <div class="checkout_order-summary checkout_subtotal">
      <p>Subtotal :</p>
      <p>₦ ${(newPrice).toLocaleString()}</p>
  </div>
  
  <div class="checkout_order-summary checkout_delivery-fee">
      <p>Delivery fee :</p>
      <p>₦ ${deliveryFee.toLocaleString()}</p>
  </div><hr>
  <div class="checkout_order-summary checkout_total">
      <p>Total :</p>
      <p>₦ ${(totalCost ).toLocaleString()}</p>
  </div>
`

}
calculateTotalPrice()
// 

// 
checkoutProductQuantity.innerText = `${checkoutProducts.length} items`

// handle product details
const handleProductDetails = () =>{
  
  checkoutProducts.forEach(product =>{
    checkoutProductDetails.innerHTML += `
    <div class="checkout_products_details">
    <div class="checkout_product_image"><img src="${product.checkoutImage}" alt="${product.productName}"></div>
    <h2>${product.checkoutProductName}</h2>
    </div>
    `
    console.log(product.checkoutProductName);
    
  })
}
handleProductDetails()


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
fullnameInputElem.addEventListener("change",handleFullname)
emailInputElem.addEventListener("change",handleUserEmail)
telephoneElem.addEventListener("change",handleTelephoneNum)
addressElem.addEventListener("change",handleUserAddress)
payBtnElem.addEventListener("click", handlePayBtn)
logOutBtnElem.addEventListener("click", handleLogout);
searchBarInputElem.addEventListener("change", handleSearchBoxInput);
closeSearchIcon.addEventListener("click", handleClosingSearchSection);
searchBarContainer.addEventListener("submit", handleSearchBox);