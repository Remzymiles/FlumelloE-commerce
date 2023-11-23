import { cartPageElems } from "./cartPageHtmlELems";
import { handleShowCartProductAndPrice } from "./showCartProducts";
import { handleCartIcon } from "../utility/handleLogoutAndDropdownFunc";

const {
  logOutBtnElem,
  productsContainerElem,
  cartQuantity,
  totalPriceContainer,
  checkoutBtn,
} = cartPageElems;

let addProductsToCart = JSON.parse(localStorage.getItem("addProductsToCart")) || [];


export const handleDeleteProductFromCart = (deleteButtons) =>{
  deleteButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      addProductsToCart.splice(index, 1);
      
      localStorage.setItem("addProductsToCart", JSON.stringify(addProductsToCart));
      
      handleShowCartProductAndPrice()
          // handle cart icon
          handleCartIcon()
        });
      });
}