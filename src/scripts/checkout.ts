import "../styles/style.css"
import "font-awesome/css/font-awesome.css";
import "../assets/images/logo2.png";
import "../assets/images/flumello_favicon.png";
import { storedUserLoginStatus } from "./saveToLocalStorage";
import { IProduct } from "./IProduct";
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




// handle cart icon
cartQuantity.innerHTML = addProductsToCart.length;
addProductsToCart.length === 0 ? cartQuantity.classList.add("none_elem"): cartQuantity.classList.remove("none_elem") 
//

//
storedUserLoginStatus === null || storedUserLoginStatus === false
  ? (window.location.href = "./sign-up.html")
  : null;

//

//handle dropdown links
const handleDropdownButtonStatus = () => {
  if (storedUserLoginStatus === true) {
    signUpBtnElem.classList.add("none_elem")
    logInBtnElem.classList.add("none_elem")
  } else {
    signUpBtnElem.classList.remove("none_elem")
    logInBtnElem.classList.remove("none_elem")
  }
}
handleDropdownButtonStatus();

//handle logout button
const handleLogout: EventListener = (e: Event):void => {
  let isUserLoggedIn: boolean = false;

  localStorage.setItem("isUserLoggedIn", JSON.stringify(isUserLoggedIn));
};
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
const displaySearchedProducts: Function = () => {
  const searchInput = searchBarInputElem.value.toLowerCase();
  const matchingProducts = products.filter(
    (product) =>
      product.title.toLowerCase() === searchInput ||
      product.brand.toLowerCase() === searchInput ||
      product.category.toLowerCase() === searchInput
  );

  if (matchingProducts.length > 0) {
    let showSearchProducts = "";

    matchingProducts.forEach((product) => {
      showSearchProducts += `
            <a href="product-page.html" class = "click">
                <!--  -->
                <div class="search_card_image">
                  <img src="${product.images[0]}" alt=""/>
                </div>
                <!--  -->
                <div class="search_card_description">
                  <h4>${product.title}</h4>
                  <h4 class= "product_id">${product.id}</h4>
                   <div class="search_card_price">
                    <span class="">₦${(product.price * 520).toLocaleString()}</span>
                    <span class="search_card_line_through">₦${(Math.round(parseFloat((product.price * 1.324).toFixed(2)) * 520)).toLocaleString()}</span>
                  </div>
                </div>
                <!--  -->
              </a>
            `;
    });
    searchedItemsContainerElem.innerHTML = showSearchProducts;

    const productCards = document.querySelectorAll<HTMLAnchorElement>(".click");
    productCards.forEach((product) => {
      product.addEventListener("click", () => {
        const productId = product.querySelector<HTMLHeadingElement>(".product_id").textContent;
        localStorage.setItem("clickedProductId", JSON.stringify(productId));
      });
    })  

  } else {
    searchErrorMsg.innerHTML = `<p>Opps! Product not available</p>`;
  }
};
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
  <h1>${checkoutProducts.length} items</h1>
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

    displaySearchedProducts();
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