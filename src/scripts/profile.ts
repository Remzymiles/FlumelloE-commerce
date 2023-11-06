import "../styles/style.css";
import "font-awesome/css/font-awesome.css";
import "../assets/images/logo2.png";
import { userData} from "./saveToLocalStorage";
import { storedUserLoginStatus } from "./saveToLocalStorage";
import { IProduct } from "./IProduct";
// 


// 
const acctNameElem = document.querySelector<HTMLParagraphElement>("p.account-name")
const userEmailElem = document.querySelector<HTMLParagraphElement>("p.user-email")
const userTelElem = document.querySelector<HTMLParagraphElement>("p.user-telephone")
const userAddressElem = document.querySelector<HTMLParagraphElement>("p.user-address")
const signUpBtnElem = document.querySelector<HTMLLinkElement>(".signup-btn");
const logInBtnElem = document.querySelector<HTMLElement>(".login-btn");
const logOutBtnElem = document.querySelector<HTMLElement>(".logout-btn");
const cartQuantity = document.querySelector<HTMLSpanElement>(".cart-link span");
const searchBarContainer = document.querySelector<HTMLFormElement>(".search_box");
const searchBarInputElem = document.querySelector<HTMLInputElement>("#search");
const searchSectionContainer = document.querySelector<HTMLDivElement>(".searched_item_container");
const closeSearchIcon = document.querySelector<HTMLElement>(".close_search_icon");
const searchedItemsContainerElem = document.querySelector<HTMLDivElement>(".search_items");
const searchErrorMsg = document.querySelector<HTMLDivElement>(".search_error_msg");
// 

// global variables
let addProductsToCart = JSON.parse(localStorage.getItem("addProductsToCart")) || [];
let getSearchInput: string;
let products: IProduct[];

// 



// handle cart icon
cartQuantity.innerHTML = addProductsToCart.length;
addProductsToCart.length === 0 ? cartQuantity.classList.add("none_elem"): cartQuantity.classList.remove("none_elem")
//


// handling logout button
storedUserLoginStatus === null || storedUserLoginStatus === false
  ? (window.location.href = "./sign-up.html")
  : null;

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
                    <span class="search_card_line_through">₦${(Math.round(parseFloat((product.price * 1.324).toFixed(2)) * 520)).toLocaleString()}</span>
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


// getting user details
const profileName:Function = () => {
    acctNameElem.innerText = `${userData().lastName} ${userData().firstName}`
}
const userEmail:Function = () => {
    userEmailElem.innerText = `${userData().email}`
}
const userNumber:Function = () => {
  const getNumberInput = JSON.parse(localStorage.getItem("userTelephone"))
  userTelElem.innerText = `${getNumberInput}`
}
const userAddress:Function = () => {
    const getAddressInput = JSON.parse(localStorage.getItem("userAddress"))
    userAddressElem.innerText = `${getAddressInput}`
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




//handle logout button
const handleLogout:EventListener = (e: Event):void => {
  let isUserLoggedIn: boolean = false;
  
  localStorage.setItem("isUserLoggedIn", JSON.stringify(isUserLoggedIn));
};
// 




handleDropdownButtonStatus();

profileName()
userEmail()
userAddress()
userNumber()

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