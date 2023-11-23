import { IProduct } from "../interface/IProduct";
import { productPageHtmlElems } from "./productPageHtmlELems";
import { productPageImports } from "./productPageImports";

const {
  handleCartIcon,
} = productPageImports
// 
const {
  productDetailsContainer,
  cartQuantity
} = productPageHtmlElems
// 

let products: IProduct[];
let addProductsToCart = JSON.parse(localStorage.getItem("addProductsToCart")) || [];
let productQuantityInput: string 
//


// get clicked product from local storage
const clickedProductId = JSON.parse(localStorage.getItem("clickedProductId"));
const productId = Number(clickedProductId);




export const handleProduct = (product:IProduct) => {

  if (product) {
     const productQuantityFromCart = addProductsToCart.find(product => product.newProductId === productId)
     const newProductQuantity = productQuantityFromCart ? productQuantityFromCart.productQuantity : 1;
    
    let showMatchedProducts = "";

      showMatchedProducts = `
      <section class="product">
        <div class="image">
            <img src="${product.images[0]}" alt="${product.title}">
        </div>
        <div>
          <div class="text">
            <p>${product.title}</p>
            <h1>₦ ${(product.price * 520).toLocaleString()}</h1>
            <p class="card_line_through">₦ ${Math.floor((product.price / (1 - (product.discountPercentage / 100)) * 520)).toLocaleString()}</p>
            <p>${product.discountPercentage}% off</p>
            <p>Price shown before tax, Free shipping</p>
            <span>
            <i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>
            <i class="fa fa-star"></i><i class="fa fa-star"></i> 4.9 | ${(product.stock * 323).toLocaleString()}+ sold
            </span>
            <div class="product_quantity_input">
              <label for="quantity" id="product_quantity_label">Quantity:</label>
              <input type="number" name="quantity" id="product_quantity" min="1" value="${newProductQuantity}">
            </div>
            <div class="buttons">
                <a href="checkout.html" class="buy_now_btn">Buy Now</a>
                <a href="#" class="add_to_cart_btn"> Add To Cart</a>
            </div>
          </div>
        </div>
                </section>
                <hr>
                <div class="desc">
                    <h2>Description</h2>
                    <p>${product.description}</p>
                </div>`;

    productDetailsContainer.innerHTML = showMatchedProducts;
// 
    const productQuantity = document.querySelector<HTMLInputElement>("#product_quantity");
    const addToCartBtnElem = document.querySelector<HTMLAnchorElement>(".add_to_cart_btn");
    const buyNowBtnElem = document.querySelector<HTMLAnchorElement>(".buy_now_btn");

    productQuantityInput = productQuantity.value;


    // handle get the product quantity
    const handleGetProductQuantity: EventListener = (e: Event): void => {
      const getQuantityInput = e.target as HTMLInputElement;
      productQuantityInput = getQuantityInput.value;
    };

    // 

    // handle cart icon
    handleCartIcon();

    
    
    // 
    const handleAddToCart: EventListener = (e: Event): void => {
      if (!productQuantityInput || productQuantityInput === "0") {
        alert("product Quantity not added!");
        return;
      }
    
      // Check if the product already exists in the cart
      const existingProduct = addProductsToCart.find(
        (product) => product.newProductId === productId
      );
    
      if (!existingProduct) {
          const newProduct = {
            newProductId: productId,
            image: product.images[0],
            productName: product.title,
            productPrice: product.price,
            productStock: product.stock,
            productDiscountPercentage: product.discountPercentage,
            productQuantity: Number(productQuantityInput),
          };
    
          addProductsToCart.push(newProduct);
          handleCartIcon();
; 
        
      } else {
        existingProduct.productQuantity = Number(productQuantityInput);
        handleCartIcon();
      }
    
      // Save the cart to localStorage
      localStorage.setItem("addProductsToCart", JSON.stringify(addProductsToCart));
    
      // Handle cart icon
      handleCartIcon();
; 
    };

    // handle products for checkout
    const handleProductsForCheckout: EventListener = (e: Event):void =>{
      let checkoutProducts = []


      const newCheckoutProduct = {
        checkoutProductId: productId,
        checkoutImage: product.images[0],
        checkoutProductName: product.title,
        checkoutProductPrice: product.price,
        checkoutProductStock: product.stock,
        checkoutProductDiscountPercentage: product.discountPercentage,
        checkoutProductQuantity: Number(productQuantityInput),
        isProductFromCart: false,
      };
      checkoutProducts.push(newCheckoutProduct)
      localStorage.setItem("checkoutProducts", JSON.stringify(checkoutProducts))
    }


    // 
    productQuantity.addEventListener("change", handleGetProductQuantity);
    addToCartBtnElem.addEventListener("click", handleAddToCart);
    buyNowBtnElem.addEventListener("click",  handleProductsForCheckout)
   
    //
  }
};


