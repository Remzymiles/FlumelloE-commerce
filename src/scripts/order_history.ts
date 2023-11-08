import "../styles/style.css"
import "font-awesome/css/font-awesome.css";
import "../assets/images/logo2.png";
import "../assets/images/flumello_favicon.png";
import { storedUserLoginStatus } from "./saveToLocalStorage";
import { IProduct } from "./IProduct";
import { displaySearchedProducts } from "./displaySearchFunction";
import { handleLogout } from "./handleLogoutAndDropdownFunc";
import { handleDropdownButtonStatus } from "./handleLogoutAndDropdownFunc";
import { handleCartIcon } from "./handleLogoutAndDropdownFunc";
// 


// 
const signUpBtnElem = document.querySelector<HTMLLinkElement>(".signup-btn");
const logInBtnElem = document.querySelector<HTMLElement>(".login-btn");
const logOutBtnElem = document.querySelector<HTMLElement>(".logout-btn");
const cartQuantity = document.querySelector<HTMLSpanElement>(".cart-link span");
const searchBarContainer = document.querySelector<HTMLFormElement>(".search_box");
const searchBarInputElem = document.querySelector<HTMLInputElement>("#search");
const searchSectionContainer = document.querySelector<HTMLDivElement>(".searched_item_container");
const closeSearchIcon = document.querySelector<HTMLElement>(".close_search_icon");
const searchedItemsContainerElem = document.querySelector<HTMLDivElement>(".search_items");
const searchErrorMsg = document.querySelector<HTMLDivElement>(".search_error_msg");
const orderHistoryContainer = document.querySelector<HTMLDivElement>(".orders")
const clearHistoryElem = document.querySelector<HTMLAnchorElement>("#clear_history")
const clearHistoryWarningModal = document.querySelector<HTMLDivElement>(".clear_history_modal")
const clearHistoryBtn = document.querySelector<HTMLAnchorElement>(".clear_modal a")
// 



// global variables
let addProductsToCart = JSON.parse(localStorage.getItem("addProductsToCart")) || [];
let orderedProducts = JSON.parse(localStorage.getItem("productHistory")) || []
let getSearchInput: string;
let products: IProduct[];

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



// handle history when no product is available
if(orderedProducts.length === 0 || null){
  orderHistoryContainer.innerHTML = `<p class= "empty_history">History Is Empty!</p>`
  clearHistoryElem.style.display = "none"
}
//


// handle products history
const handleProducts: Function = () =>{
  orderedProducts.forEach(product =>{
    orderHistoryContainer.innerHTML += `
    <div class="order_details">
      <div class="order_img">
          <img src="${product.image}" alt="${product.productName}">
      </div>  
      <div class="order-text">
          <h2>${product.productName}</h2>
          <p>₦ ${(product.productPrice * 520).toLocaleString()}</p>
          <h6 id ="quantity">Quantity: ${product.productQuantity}</h6>
          <a href="product-page.html" class="order_history_view_product" id="${product.productId}">View Product</a>
      </div>
    </div> <hr>
    `;
    
  })
  const viewProduct = document.querySelectorAll<HTMLButtonElement>(".order_history_view_product");

  viewProduct.forEach((viewProduct) => {
    viewProduct.addEventListener("click", () => {
      const productId = viewProduct.id;
      localStorage.setItem("clickedProductId", JSON.stringify(productId));
    });
  });

  
}
handleProducts()
// 

// handle clearing of order history
const handleClearHistoryWarning:EventListener = (e: Event): void =>{
  e.preventDefault()
  clearHistoryWarningModal.classList.add("block_elem")
}
const handleClearHistory:EventListener = (e: Event): void =>{
  localStorage.removeItem("productHistory")

}

// 

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
clearHistoryElem.addEventListener("click", handleClearHistoryWarning)
clearHistoryBtn.addEventListener("click", handleClearHistory)