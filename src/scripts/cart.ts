import "../styles/style.css"
import "font-awesome/css/font-awesome.css";
import "../assets/images/logo2.png";
import "../assets/images/flumello_favicon.png";
import { storedUserLoginStatus } from "./saveToLocalStorage";
import { IProduct } from "./IProduct";
// 


// 
const signUpBtnElem = document.querySelector<HTMLAnchorElement>(".signup-btn");
const logInBtnElem = document.querySelector<HTMLElement>(".login-btn");
const logOutBtnElem = document.querySelector<HTMLElement>(".logout-btn");
const productsContainerElem = document.querySelector<HTMLDivElement>(".products");
const cartQuantity = document.querySelector<HTMLSpanElement>(".cart-link span");
const totalPriceContainer = document.querySelector<HTMLDivElement>(".subtotal")
const searchBarContainer = document.querySelector<HTMLFormElement>(".search_box");
const searchBarInputElem = document.querySelector<HTMLInputElement>("#search");
const searchSectionContainer = document.querySelector<HTMLDivElement>(".searched_item_container");
const closeSearchIcon = document.querySelector<HTMLElement>(".close_search_icon");
const searchedItemsContainerElem = document.querySelector<HTMLDivElement>(".search_items");
const searchErrorMsg = document.querySelector<HTMLDivElement>(".search_error_msg");
const checkoutBtn = document.querySelector<HTMLButtonElement>(".cart_checkout_btn")
//



// Global variables
let getSearchInput: string;
let products: IProduct[];
let addProductsToCart = JSON.parse(localStorage.getItem("addProductsToCart")) || [];
// 



//
storedUserLoginStatus === null || storedUserLoginStatus === false
  ? (window.location.href = "./sign-up.html")
  : null;
//


// handle cart icon
cartQuantity.innerHTML = addProductsToCart.length;
addProductsToCart.length === 0 ? cartQuantity.classList.add("none_elem"): cartQuantity.classList.remove("none_elem")
// 


// handle totalPriceContainer if addProductsToCart is empty
if(addProductsToCart === null){
  totalPriceContainer.innerHTML = `<p class="empty_cart">Cart is Empty!</p>`
}
// 


//handle dropdown links
const handleDropdownButtonStatus:Function = () => {
  if (storedUserLoginStatus === true) {
    signUpBtnElem.classList.add("none_elem")
    logInBtnElem.classList.add("none_elem")
  } else {
    signUpBtnElem.classList.remove("none_elem")
    logInBtnElem.classList.remove("none_elem")
  }
}
handleDropdownButtonStatus();

//handle logout button
const handleLogout:EventListener = (e: Event):void => {
  let isUserLoggedIn: boolean = false;

  localStorage.setItem("isUserLoggedIn", JSON.stringify(isUserLoggedIn));
};
// 



// handle search box
const handleSearchBox: EventListener = (e: Event): void => {
  e.preventDefault();
  //
  getSearchInput
  ? searchSectionContainer.classList.add("block_elem")
  : searchSectionContainer.classList.remove("block_elem")
  // 
  handleGetProductFromApi();
};
//

// get user input
const handleSearchBoxInput: EventListener = (e: Event): void => {
  const searchInput = e.target as HTMLInputElement;
  getSearchInput = searchInput.value;
};
//

// close the search section when the x icon is clicked
const handleClosingSearchSection: EventListener = (): void => {
  searchSectionContainer.classList.add("none_elem");
};
//

// displaying the searched products
const displaySearchedProducts:Function = () => {
  const searchInput = searchBarInputElem.value.toLowerCase();
  const matchingProducts = products.filter(
    (product) =>
      product.title.toLowerCase() === searchInput ||
      product.brand.toLowerCase() === searchInput ||
      product.category.toLowerCase() === searchInput
  );

  if (matchingProducts.length > 0) {
    let showSearchProducts = "";

    matchingProducts.forEach((product) => {
      showSearchProducts += `
            <a href="product-page.html" class = "click">
                <!--  -->
                <div class="search_card_image">
                  <img src="${product.images[0]}" alt=""/>
                </div>
                <!--  -->
                <div class="search_card_description">
                  <h4>${product.title}</h4>
                  <h4 class= "product_id">${product.id}</h4>
                   <div class="search_card_price">
                    <span class="">₦${(product.price * 520).toLocaleString()}</span>
                    <span class="search_card_line_through">₦ ${Math.floor((product.price / (1 - (product.discountPercentage / 100)) * 520)).toLocaleString()}</span>
                  </div>
                </div>
                <!--  -->
              </a>
            `;
    });
    searchedItemsContainerElem.innerHTML = showSearchProducts;

    const productCards = document.querySelectorAll<HTMLAnchorElement>(".click");
    productCards.forEach((product) => {
      product.addEventListener("click", () => {
        const productId = product.querySelector<HTMLHeadingElement>(".product_id").textContent;
        localStorage.setItem("clickedProductId", JSON.stringify(productId));
      });
    })  

  } else {
    searchErrorMsg.innerHTML = `<p>Opps! Product not available</p>`;
  }
};
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
// getting product from API
const handleGetProductFromApi = async () => {

  try {
    const res = await fetch(`https://dummyjson.com/products`);
    const data = await res.json();
    products = data.products;

    displaySearchedProducts();
  } catch (error) {
    console.log(error);
  }
};
// 




// 
logOutBtnElem.addEventListener("click", handleLogout);
searchBarInputElem.addEventListener("change", handleSearchBoxInput);
closeSearchIcon.addEventListener("click", handleClosingSearchSection);
searchBarContainer.addEventListener("submit", handleSearchBox);
checkoutBtn.addEventListener("click", handleCheckoutBtn)