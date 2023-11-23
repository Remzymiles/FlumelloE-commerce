import { cartPageElems } from "./cartPage/cartPageHtmlELems";
import { cartPageImports } from "./cartPage/cartPageImports";
import { handleDeleteProductFromCart } from "./cartPage/deleteProductFromCart";
import { searchFuncsAndFetchApi } from "./handleSearchFuncsAndFetchApiForSearch";
import { handleRedirectIfUserIsNotLoggedIn } from "./utility/redirectIfUserIsNotLoggedIn";
import { IProduct } from "./interface/IProduct";
import { handleShowCartProductAndPrice } from "./cartPage/showCartProducts";

//

//
const { 
  handleCartIcon,
  handleLogout,
  handleDropdownButtonStatus
} = cartPageImports;

const {
  logOutBtnElem,
  totalPriceContainer,
  checkoutBtn,
} = cartPageElems;
//

// handle search box
searchFuncsAndFetchApi();

// Global variables
let addProductsToCart = JSON.parse(localStorage.getItem("addProductsToCart")) || [];
//

// redirect to login page if user isn't logged in
handleRedirectIfUserIsNotLoggedIn();

// handle cart icon
handleCartIcon();
//

// handle totalPriceContainer if addProductsToCart is empty
if (addProductsToCart === null) {
  totalPriceContainer.innerHTML = `<p class="empty_cart">Cart is Empty!</p>`;
}
//

//handle dropdown links
handleDropdownButtonStatus();
//

// handle showing cart products and calculating the total price
handleShowCartProductAndPrice()
// 

// handle checkout button
const handleCheckoutBtn: EventListener = (e: Event): void => {
  let checkoutProducts = [];

  addProductsToCart.forEach((product) => {
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
    checkoutProducts.push(newCheckoutProduct);
    localStorage.setItem("checkoutProducts", JSON.stringify(checkoutProducts));
  });
};

//
logOutBtnElem.addEventListener("click", handleLogout);
checkoutBtn.addEventListener("click", handleCheckoutBtn);
