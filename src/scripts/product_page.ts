import "../styles/style.css";
import "font-awesome/css/font-awesome.css";
import "../assets/images/logo2.png";
import "../assets/images/flumello_favicon.png";
import { storedUserLoginStatus } from "./saveToLocalStorage";
import { displaySearchedProducts } from "./displaySearchFunction";
import { handleLogout } from "./handleLogoutAndDropdownFunc";
import { handleDropdownButtonStatus } from "./handleLogoutAndDropdownFunc";
import { handleCartIcon } from "./handleLogoutAndDropdownFunc";
//

// interface
interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}
//

//
const signUpBtnElem = document.querySelector<HTMLLinkElement>(".signup-btn");
const logInBtnElem = document.querySelector<HTMLElement>(".login-btn");
const logOutBtnElem = document.querySelector<HTMLElement>(".logout-btn");
const productDetailsContainer = document.querySelector<HTMLDivElement>(".matched_product");
const productDesc = document.querySelector<HTMLDivElement>(".desc p");
const otherProductsContainer = document.querySelector<HTMLDivElement>(".scroll_snap");
const scrollContainer = document.querySelectorAll<HTMLDivElement>(".slide");
const loader = document.querySelectorAll<HTMLElement>(".product_loader");
const leftArrow = document.querySelectorAll<HTMLElement>(".scroll-left");
const rightArrow = document.querySelectorAll<HTMLElement>(".scroll-right");
const arrow = document.querySelectorAll<HTMLElement>("#arrow");
const searchBarInputElem = document.querySelector<HTMLInputElement>("#search");
const searchBarContainer = document.querySelector<HTMLFormElement>(".search_box");
const searchSectionContainer = document.querySelector<HTMLDivElement>(".searched_item_container");
const closeSearchIcon = document.querySelector<HTMLElement>(".close_search_icon");
const searchedItemsContainerElem = document.querySelector<HTMLDivElement>(".search_items");
const searchErrorMsg = document.querySelector<HTMLDivElement>(".search_error_msg");
const cartQuantity = document.querySelector<HTMLSpanElement>(".cart-link span");

//

// Global variable
let products: IProduct[];
let getSearchInput: string;
let addProductsToCart = JSON.parse(localStorage.getItem("addProductsToCart")) || [];
let productQuantityInput: string 
//


// get clicked product from local storage
const clickedProduct = JSON.parse(localStorage.getItem("clickedProductId"));
const productId = Number(clickedProduct);

//

// handle redirect if user doesn't have an account
storedUserLoginStatus === null || storedUserLoginStatus === false
  ? (window.location.href = "./sign-up.html")
  : null;

//

// handle cart icon
handleCartIcon(cartQuantity)


//handle dropdown links
handleDropdownButtonStatus(signUpBtnElem,logInBtnElem);;
//

// handle search box
const handleSearchBox: EventListener = (e: Event): void => {
  e.preventDefault();
  //
  getSearchInput
    ? searchSectionContainer.classList.add("block_elem")
    : searchSectionContainer.classList.remove("block_elem");
  //
  handleGetProductFromApiById();
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



// find the product that matches the id and add it to the product page
const handleProduct:Function = () => {
  const matchingProduct = products.filter(
    (product) => product.id === productId
  );

  if (matchingProduct) {
    
    let showMatchedProducts = "";

    matchingProduct.forEach((product) => {
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
              <input type="number" name="quantity" id="product_quantity" min="1" value="1">
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
    });
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
    handleCartIcon(cartQuantity)
    
    
    // 
    const handleAddToCart: EventListener = (e: Event): void => {
      if (!productQuantityInput || productQuantityInput === "0") {
        alert("Product Quantity not added!");
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
      }
    
      // Save the cart to localStorage
      localStorage.setItem("addProductsToCart", JSON.stringify(addProductsToCart));
    
      // Handle cart icon
      handleCartIcon(cartQuantity);
    };
    
    // 

    // handle products for checkout
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


    // 
    productQuantity.addEventListener("change", handleGetProductQuantity);
    addToCartBtnElem.addEventListener("click", handleAddToCart);
    buyNowBtnElem.addEventListener("click",  handleProductsForCheckout)
   
    //
  }
};
//

// handle adding products from API to other products section
const otherProducts = () => {
  let imageCardHTML = "";

  products.forEach((product) => {
    
    imageCardHTML += `
      <div class="slide_card">
        <a href="product-page.html" class="click">
          <span class="card_discount_percent">${product.discountPercentage}%</span>
          <div class="card_image">
            <img src="${product.images[0]}" alt="${product.title}" />
          </div>
          <div class="card_description">
            <h4 class="product_title">${product.title}</h4>
            <h4 class= "product_id">${product.id}</h4>
            <p class="product_remaining">${product.stock} Remaining</p>
            <div class="card_price">
              <p class="card_bold">₦ ${(product.price * 520).toLocaleString()}</p>
              <p class="card_line_through">₦ ${Math.floor((product.price / (1 - (product.discountPercentage / 100)) * 520)).toLocaleString()}</p>
            </div>
          </div>
        </a>
      </div>
    `;
  });

  otherProductsContainer.innerHTML = imageCardHTML;

  const productCards = document.querySelectorAll<HTMLAnchorElement>(".click");
  productCards.forEach((product) => {
    product.addEventListener("click", () => {
      const productId = product.querySelector<HTMLHeadingElement>(".product_id").textContent;
      localStorage.setItem("clickedProductId", JSON.stringify(productId));
    });
  });
};
//

// handle image card arrows
const cardWidth = 200;
const scrollLeft = (container) => () => {
  container.scrollBy({
    left: -cardWidth,
    behavior: "smooth",
  });
};
//
const scrollRight = (container) => () => {
  container.scrollBy({
    left: cardWidth,
    behavior: "smooth",
  });
};

for (let i = 0; i < leftArrow.length; i++) {
  leftArrow[i].addEventListener("click", scrollLeft(scrollContainer[i]));

  rightArrow[i].addEventListener("click", scrollRight(scrollContainer[i]));
}
//

// handle get product from API by id

const handleGetProductFromApiById = async () => {
  arrow.forEach((arrow) => {
    arrow.classList.add("none_elem");
  });
  loader.forEach((loader) => {
    loader.classList.add("block_elem");
  });
  try {
    const res = await fetch(`https://dummyjson.com/products`);
    const data = await res.json();
    products = data.products;
    otherProducts();
    handleProduct();
    displaySearchedProducts(
      products,
      searchBarInputElem.value.toLowerCase(),
      searchedItemsContainerElem,
      searchErrorMsg
      );

    arrow.forEach((arrow) => {
      arrow.classList.remove("none_elem");
    });
    //
    loader.forEach((loader) => {
      loader.classList.add("none_elem");
    });
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
handleGetProductFromApiById();
//

//

//
logOutBtnElem.addEventListener("click", handleLogout);
searchBarInputElem.addEventListener("change", handleSearchBoxInput);
closeSearchIcon.addEventListener("click", handleClosingSearchSection);
searchBarContainer.addEventListener("submit", handleSearchBox);
