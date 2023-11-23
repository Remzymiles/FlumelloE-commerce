import { checkoutHtmlElems } from "./checkoutPageHtmlElems";


const {
    checkoutPricingContainer,
    checkoutProductDetails,
    checkoutQuantity
  } = checkoutHtmlElems
// 

let checkoutProducts = JSON.parse(localStorage.getItem("checkoutProducts"))


export const handlePriceCalculationAndDisplay = () =>{
  const calculateTotalPrice: Function = () =>{
    let newPrice = 0
    let totalCost = 0
    let deliveryFee = 0
  
    checkoutProducts.forEach(product =>{
      // handle new price
      newPrice += (product.checkoutProductPrice * 520) * product.checkoutProductQuantity;
      // 
  
      // handle delivery fee
      newPrice <= 1000000 ? deliveryFee = 10000 : deliveryFee = 5000
      // 
  
      // handle total cost
      totalCost = newPrice + deliveryFee
  
    })
    // 
    
  // handle display prices
  checkoutPricingContainer.innerHTML = `
    <div class="checkout_order-summary checkout_subtotal">
        <p>Subtotal :</p>
        <p>₦ ${(newPrice).toLocaleString()}</p>
    </div>
    
    <div class="checkout_order-summary checkout_delivery-fee">
        <p>Delivery fee :</p>
        <p>₦ ${deliveryFee.toLocaleString()}</p>
    </div><hr>
    <div class="checkout_order-summary checkout_total">
        <p>Total :</p>
        <p>₦ ${(totalCost ).toLocaleString()}</p>
    </div>
  `
  
  }
  calculateTotalPrice()
  // 
  
  
  // handle product details
  const handleProductDetails = () =>{
    checkoutQuantity.innerText = `${checkoutProducts.length} items`
    checkoutProducts.forEach(product =>{
      checkoutProductDetails.innerHTML += `
      <div class="checkout_products_details">
      <div class="checkout_product_image"><img src="${product.checkoutImage}" alt="${product.productName}"></div>
      <h2>${product.checkoutProductName}</h2>
      </div>
      `
      console.log(product.checkoutProductName);
      
    })
  }
  handleProductDetails()
}