import { cartPageElems } from "./cartPageHtmlELems";
import { handleDeleteProductFromCart } from "./deleteProductFromCart";


const {
    signUpBtnElem,
    logInBtnElem,
    logOutBtnElem,
    productsContainerElem,
    cartQuantity,
    totalPriceContainer,
    searchBarContainer,
    searchBarInputElem,
    searchSectionContainer,
    closeSearchIcon,
    searchedItemsContainerElem,
    searchErrorMsg,
    checkoutBtn
} = cartPageElems;

let addProductsToCart = JSON.parse(localStorage.getItem("addProductsToCart")) || [];


export const handleShowCartProductAndPrice = () =>{
const handleAddProductsToCart: Function = () => {
    if (!addProductsToCart || addProductsToCart.length === 0) {
      productsContainerElem.innerHTML = `<p class="empty_cart">Cart is Empty!</p>`;
      return;
    }
  
    let showMatchedProducts: string = "";
  
    addProductsToCart.forEach((product) => {
      showMatchedProducts += `
          <div class="product-card">
              <div class="image"><img src="${product.image}" alt="image"></div>
              <div class="text">
                  <p>${product.productName}</p>
                  <h1>₦ ${(product.productPrice * 520).toLocaleString()}</h1>
                  <h6>${product.productStock} Remaining</h6>
                  <p class="cart_product_quantity"><i class="fa fa-minus-circle quantity_icon minus_icon"></i> ${
                    product.productQuantity
                  } <i class="fa fa-plus-circle quantity_icon plus_icon"></i></p>
              </div>
              <hr>
              <div class="links">
              <a href="" class= "delete-product">Delete</a>
              </div>
              </div>
              `;
    });
    productsContainerElem.innerHTML = showMatchedProducts;
  
    const minusIcons = document.querySelectorAll<HTMLElement>(".minus_icon");
    const plusIcons = document.querySelectorAll<HTMLElement>(".plus_icon");
    const deleteButtons =
      document.querySelectorAll<HTMLElement>(".delete-product");
    //
  
    // event listeners for the minus buttons
    minusIcons.forEach((button, index) => {
      button.addEventListener("click", () => {
        if (addProductsToCart[index].productQuantity > 1) {
          addProductsToCart[index].productQuantity--;
          localStorage.setItem(
            "addProductsToCart",
            JSON.stringify(addProductsToCart)
          );
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
        localStorage.setItem("addProductsToCart",JSON.stringify(addProductsToCart));
        handleAddProductsToCart();
        calculateTotalPrice();
      });
    });
    //
  
    // handle delete button
    handleDeleteProductFromCart(deleteButtons);
    //
};
// 
const calculateTotalPrice: Function = () => {
  let total = 0;

  addProductsToCart.forEach((product) => {
    total += product.productPrice * product.productQuantity;
  });

  totalPriceContainer.innerHTML = `
  <p>Subtotal :</p>  
  <p>₦ ${(total * 520).toLocaleString()}</p>`;
};
calculateTotalPrice();
handleAddProductsToCart()
}