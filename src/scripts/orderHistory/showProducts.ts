import { orderHistoryHtmlElems } from "./orderHistoryHtmlElems";



const {
    logOutBtnElem,
    orderHistoryContainer,
    clearHistoryElem,
    clearHistoryWarningModal,
    clearHistoryBtn,
} = orderHistoryHtmlElems


let orderedProducts = JSON.parse(localStorage.getItem("productHistory")) || []



export const handleShowProducts = () =>{
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
}