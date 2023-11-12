export const handleProductsForCheckoutFunc  = (productQuantityInput,products,productId,buyNowBtnElem) =>{
    const handleProductsForCheckout: EventListener = (e: Event):void =>{
        let checkoutProducts = []
    
          if (!productQuantityInput || productQuantityInput === "0") {
            e.preventDefault()
            alert("product Quantity not added!");
            return;
          }
    
          const productToAddToCheckout = products.find((product) => product.id === productId);
    
          const newCheckoutProduct = {
            checkoutProductId: productId,
            checkoutImage: productToAddToCheckout.images[0],
            checkoutProductName: productToAddToCheckout.title,
            checkoutProductPrice: productToAddToCheckout.price,
            checkoutProductStock: productToAddToCheckout.stock,
            checkoutProductDiscountPercentage: productToAddToCheckout.discountPercentage,
            checkoutProductQuantity: Number(productQuantityInput),
            isProductFromCart: false,
          };
          checkoutProducts.push(newCheckoutProduct)
          localStorage.setItem("checkoutProducts", JSON.stringify(checkoutProducts))
        }
    buyNowBtnElem.addEventListener("click",  handleProductsForCheckout)

    
}