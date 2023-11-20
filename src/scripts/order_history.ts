import { searchFuncsAndFetchApi } from "./handleSearchFuncsAndFetchApiForSearch";
import { IProduct } from "./interface/IProduct";
import { orderHistoryHtmlElems } from "./orderHistory/orderHistoryHtmlElems";
import { orderHistoryImports } from "./orderHistory/orderHistoryImports";
import { handleRedirectIfUserIsNotLoggedIn } from "./utility/redirectIfUserIsNotLoggedIn";

// 

const {
  storedUserLoginStatus,
  handleLogout,
  handleDropdownButtonStatus,
  handleCartIcon
} = orderHistoryImports

// 
const {
  logOutBtnElem,
  orderHistoryContainer,
  clearHistoryElem,
  clearHistoryWarningModal,
  clearHistoryBtn,
} = orderHistoryHtmlElems
// 

// global variables
let orderedProducts = JSON.parse(localStorage.getItem("productHistory")) || []
let products: IProduct[];
// 

// handle cart icon
handleCartIcon()

// redirect to login page if user isn't logged in
handleRedirectIfUserIsNotLoggedIn()

// handle drop down buttons
handleDropdownButtonStatus()

// handle search box
searchFuncsAndFetchApi()



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


// 
logOutBtnElem.addEventListener("click", handleLogout);
clearHistoryElem.addEventListener("click", handleClearHistoryWarning)
clearHistoryBtn.addEventListener("click", handleClearHistory)