import { productPageImports } from "../productPageImports";
import { productPageHtmlElems } from "./productPageHtmlELems";

const {
  handleCartIcon,
} = productPageImports

const {
  cartQuantity
} = productPageHtmlElems
//



export const handleAddProductToCart  = (productQuantityInput,products,productId,addProductsToCart,addToCartBtnElem) =>{
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
      const productToAddToCart = products.find((product) => product.id === productId);
  
      if (productToAddToCart) {
        const newProduct = {
          newProductId: productId,
          image: productToAddToCart.images[0],
          productName: productToAddToCart.title,
          productPrice: productToAddToCart.price,
          productStock: productToAddToCart.stock,
          productDiscountPercentage: productToAddToCart.discountPercentage,
          productQuantity: Number(productQuantityInput),
        };
  
        addProductsToCart.push(newProduct);
        handleCartIcon(cartQuantity); 
      }
    } else {
      existingProduct.productQuantity = Number(productQuantityInput);
      handleCartIcon(cartQuantity);
    }
  
    // Save the cart to localStorage
    localStorage.setItem("addProductsToCart", JSON.stringify(addProductsToCart));
  
    // Handle cart icon
    handleCartIcon(cartQuantity); 
  };
  addToCartBtnElem.addEventListener("click", handleAddToCart);
    
}