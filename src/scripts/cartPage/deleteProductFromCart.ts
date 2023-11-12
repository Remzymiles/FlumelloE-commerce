




export const handleDeleteProductFromCart = (deleteButtons,addProductsToCart,cartQuantity,handleAddProductsToCart,calculateTotalPrice) =>{
    deleteButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
          addProductsToCart.splice(index, 1);
      
          localStorage.setItem("addProductsToCart", JSON.stringify(addProductsToCart));
      
          // handle cart icon
        cartQuantity.innerHTML = addProductsToCart.length;
        addProductsToCart.length === 0 ? cartQuantity.classList.add("none_elem"): cartQuantity.classList.remove("none_elem")
      
          handleAddProductsToCart();
          calculateTotalPrice();
        });
      });
}