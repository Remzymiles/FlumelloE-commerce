import { cartPageElems } from "./cartPage/cartPageHtmlELems";
import { cartPageImports } from "./cartPage/cartPageImports";
import { handleDeleteProductFromCart } from "./cartPage/deleteProductFromCart";
import { searchFuncsAndFetchApi } from "./handleSearchFuncsAndFetchApiForSearch";
import { handleRedirectIfUserIsNotLoggedIn } from "./utility/redirectIfUserIsNotLoggedIn";
import { IProduct } from "./interface/IProduct";
// 

// 
const {
  handleCartIcon,
  handleLogout,
  handleDropdownButtonStatus
} = cartPageImports

const {
  signUpBtnElem,
    logInBtnElem,
    logOutBtnElem,
    productsContainerElem,
    cartQuantity,
    totalPriceContainer,
    checkoutBtn,
    searchBarContainer,
    searchBarInputElem,
    searchSectionContainer,
    closeSearchIcon,
    searchedItemsContainerElem,
    searchErrorMsg,
} = cartPageElems
//
// Global variables
let products : IProduct[] 

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

// Global variables
let addProductsToCart = JSON.parse(localStorage.getItem("addProductsToCart")) || [];
// 

// redirect to login page if user isn't logged in
handleRedirectIfUserIsNotLoggedIn()

// handle cart icon
handleCartIcon(cartQuantity)
// 

// handle totalPriceContainer if addProductsToCart is empty
if(addProductsToCart === null){
  totalPriceContainer.innerHTML = `<p class="empty_cart">Cart is Empty!</p>`
}
// 

//handle dropdown links
handleDropdownButtonStatus(signUpBtnElem,logInBtnElem);
// 

// handle adding products to cart
const handleAddProductsToCart: Function = () => {
  if (!addProductsToCart || addProductsToCart.length === 0) {
    productsContainerElem.innerHTML = `<p class="empty_cart">Cart is Empty!</p>`;
    return;
  }
  
  let showMatchedProducts: string = "";
  
  addProductsToCart.forEach(product => {
    showMatchedProducts += `
        <div class="product-card">
            <div class="image"><img src="${product.image}" alt="image"></div>
            <div class="text">
                <p>${product.productName}</p>
                <h1>₦ ${(product.productPrice * 520).toLocaleString()}</h1>
                <h6>${product.productStock} Remaining</h6>
                <p class="cart_product_quantity"><i class="fa fa-minus-circle quantity_icon minus_icon"></i> ${product.productQuantity} <i class="fa fa-plus-circle quantity_icon plus_icon"></i></p>
            </div>
            <hr>
            <div class="links">
            <a href="#" class= "delete-product">Delete</a>
            </div>
            </div>
            `;
          });
  productsContainerElem.innerHTML = showMatchedProducts;

const minusIcons = document.querySelectorAll<HTMLElement>(".minus_icon")
const plusIcons = document.querySelectorAll<HTMLElement>(".plus_icon")
const deleteButtons = document.querySelectorAll<HTMLElement>(".delete-product");
// 

// event listeners for the minus buttons
minusIcons.forEach((button, index) => {
  button.addEventListener("click", () => {
    if (addProductsToCart[index].productQuantity > 1) {
      addProductsToCart[index].productQuantity--;
      localStorage.setItem("addProductsToCart", JSON.stringify(addProductsToCart));
      handleAddProductsToCart();
      calculateTotalPrice();
    }
  });
});
// 

// Event listener for the plus buttons
plusIcons.forEach((button, index) => {
  button.addEventListener("click", () => {
    addProductsToCart[index].productQuantity++;
    localStorage.setItem("addProductsToCart", JSON.stringify(addProductsToCart));
    handleAddProductsToCart();
    calculateTotalPrice();
  });
});
// 

// handle delete button
handleDeleteProductFromCart(deleteButtons,addProductsToCart,cartQuantity,handleAddProductsToCart,calculateTotalPrice)
// 
}
// 


// Calculate total price
const calculateTotalPrice:Function = () => {
  let total = 0;

  addProductsToCart.forEach(product => {
    total += product.productPrice * product.productQuantity;
  });

  totalPriceContainer.innerHTML = `
  <p>Subtotal :</p>  
  <p>₦ ${(total * 520).toLocaleString()}</p>`;
};
calculateTotalPrice()
handleAddProductsToCart();
// 

// handle checkout button
const handleCheckoutBtn:EventListener = (e: Event):void =>{
  let checkoutProducts = []

  addProductsToCart.forEach(product =>{

    const newCheckoutProduct = {
      checkoutProductId: product.newProductId,
      checkoutImage: product.image,
      checkoutProductName: product.productName,
      checkoutProductPrice: product.productPrice,
      checkoutProductStock: product.productStock,
      checkoutProductDiscountPercentage: product.productDiscountPercentage,
      checkoutProductQuantity: product.productQuantity,
      isProductFromCart: true,
    };
    checkoutProducts.push(newCheckoutProduct)
    localStorage.setItem("checkoutProducts", JSON.stringify(checkoutProducts))
  })
}

// 
logOutBtnElem.addEventListener("click", handleLogout);
checkoutBtn.addEventListener("click", handleCheckoutBtn)