import "../styles/style.css";
import "font-awesome/css/font-awesome.css";
import "../assets/images/logo2.png";
import "../assets/images/flumello_favicon.png";
import "../assets/images/samsung-A43.jpg";
import "../assets/images/logo1.png";
import "../assets/images/logo2.png";
import "../assets/images/slider1.jpg";
import "../assets/images/slider2.jpg";
import "../assets/images/slider4.jpg";
import "../assets/images/slider5.jpg";
import "../assets/images/slider1.jpg";
import "../assets/images/refrigerators.png";
import "../assets/images/televisions.png";
import "../assets/images/computers.jpg";
import "../assets/images/groceries.png";
import "../assets/images/mobile-accessories.png";
import "../assets/images/phones.png";
import "../assets/images/shoes.png";
import "../assets/images/adidas.jpg";
import "../assets/images/Binatone.jpg";
import "../assets/images/coca-cola.jpg";
import "../assets/images/Infinix.jpg";
import "../assets/images/haier-thermocool.jpg";
import "../assets/images/Nestle.jpg";
import "../assets/images/Nivea.jpg";
import "../assets/images/Oraimo.jpg";
import "../assets/images/philips.jpg";
import "../assets/images/Samsung.jpg";
import "../assets/images/tcl.jpg";
import "../assets/images/Xiaomi.jpg";
import { storedUserLoginStatus } from "./saveToLocalStorage";
import { IProduct } from "./IProduct";
//



//getting elements from html
const signUpBtnElem = document.querySelector<HTMLLinkElement>(".signup-btn");
const logInBtnElem = document.querySelector<HTMLElement>(".login-btn");
const logOutBtnElem = document.querySelector<HTMLElement>(".logout-btn");
const searchBarContainer = document.querySelector<HTMLFormElement>(".search_box");
const searchBarInputElem = document.querySelector<HTMLInputElement>("#search");
const searchSectionContainer = document.querySelector<HTMLDivElement>(".searched_item_container");
const closeSearchIcon = document.querySelector<HTMLElement>(".close_search_icon");
const searchedItemsContainerElem = document.querySelector<HTMLDivElement>(".search_items");
const searchErrorMsg = document.querySelector<HTMLDivElement>(".search_error_msg");
const scrollContainer = document.querySelectorAll<HTMLDivElement>(".slide");
const leftArrow = document.querySelectorAll<HTMLElement>(".scroll-left");
const rightArrow = document.querySelectorAll<HTMLElement>(".scroll-right");
const arrow = document.querySelectorAll<HTMLElement>("#arrow");
const productCardsGroupOne = document.querySelector<HTMLDivElement>(".slide_group_one"); 
const productCardsGroupTwo = document.querySelector<HTMLDivElement>(".slide_group_two"); 
const productCardsGroupThree = document.querySelector<HTMLDivElement>(".slide_group_three"); 
const productCardsGroupFour = document.querySelector<HTMLDivElement>(".slide_group_four"); 
const loader = document.querySelectorAll<HTMLElement>(".product_loader")
const cartQuantity = document.querySelector<HTMLSpanElement>(".cart-link span");
//

// global variables
let getSearchInput: string;
let products: IProduct[];
let addProductsToCart = JSON.parse(localStorage.getItem("addProductsToCart")) || [];
// 


//handle redirect if user isn't logged in
storedUserLoginStatus === null || storedUserLoginStatus === false
? (window.location.href = "./sign-up.html"): null;

//

// handle cart icon
cartQuantity.innerHTML = addProductsToCart.length;
addProductsToCart.length === 0 || null ? cartQuantity.classList.add("none_elem"): cartQuantity.classList.remove("none_elem")
// 


//handle dropdown links
const handleDropdownButtonStatus = () => {
  if (storedUserLoginStatus === true) {
    signUpBtnElem.classList.add("none_elem")
    logInBtnElem.classList.add("none_elem")
  } else {
    signUpBtnElem.classList.remove("none_elem")
    logInBtnElem.classList.remove("none_elem")
  }
};
handleDropdownButtonStatus();
//

//handle logout button
const handleLogout = () => {
  let isUserLoggedIn: boolean = false;

  localStorage.setItem("isUserLoggedIn", JSON.stringify(isUserLoggedIn));
};
//

// handle search box
const handleSearchBox: EventListener = (e: Event): void => {
  e.preventDefault();
  //
  getSearchInput ? searchSectionContainer.classList.add("block_elem")
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
const displaySearchedProducts = () => {
  const searchInput = searchBarInputElem.value.toLowerCase();
  const matchingProducts = products.filter(
    (product) =>
      product.title.toLowerCase().split(" ").includes(searchInput) ||
      product.brand.toLowerCase().split(" ").includes(searchInput) ||
      product.category.toLowerCase().split(" ").includes(searchInput)
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

    const productCards = document.querySelectorAll(".click");
    productCards.forEach((product) => {
      product.addEventListener("click", () => {
        const productId = product.querySelector(".product_id").textContent;
        localStorage.setItem("clickedProductId", JSON.stringify(productId));
      });
    })  

  } else {
    searchErrorMsg.innerHTML = `<p>Opps! Product not available</p>`;
  }
};
//







// handle animated slider and its arrows for manual swipe
document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector<HTMLDivElement>(".hero_image_slider");
  const prevButton = document.querySelector<HTMLElement>(".prev-button");
  const nextButton = document.querySelector<HTMLElement>(".next-button");
  const slideWidth = slider.offsetWidth;
  const numSlides = slider.children.length;
  let currentSlide = 0;

  const goToSlide = (slideNumber) => {
    if (slideNumber < 0) {
      currentSlide = numSlides - 1;
    } else if (slideNumber >= numSlides) {
      currentSlide = 0;
    } else {
      currentSlide = slideNumber;
    }
    slider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
  }

  const nextSlide = () => {
    currentSlide++;
    goToSlide(currentSlide);
  }

  const prevSlide = () => {
    currentSlide--;
    goToSlide(currentSlide);
  }

  let autoSlideInterval = setInterval(nextSlide, 3000);

  slider.addEventListener("mouseenter", () => {
    clearInterval(autoSlideInterval);
  });

  slider.addEventListener("mouseleave", () => {
    autoSlideInterval = setInterval(nextSlide, 3000);
  });

  nextButton.addEventListener("click", nextSlide);
  prevButton.addEventListener("click", prevSlide);
});
// 


// getting the main products from the API
const ImageCardsGroupOne = () => {
  let imageCardHTML = "";

  products.slice(0, 10).forEach((product) => { 
    imageCardHTML +=`
      <div class="slide_card">
        <a href="product-page.html" class="click" > 
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

  productCardsGroupOne.innerHTML = imageCardHTML;

  const productCards = document.querySelectorAll(".click");
  productCards.forEach((product) => {
    product.addEventListener("click", () => {
      const productId = product.querySelector(".product_id").textContent;
      localStorage.setItem("clickedProductId", JSON.stringify(productId));
    });
  });
}
// 


// 
const ImageCardsGroupTwo = () => {
  let imageCardHTML = "";

  products.slice(10, 20).forEach((product) => {
    imageCardHTML += `
      <div class="slide_card">
        <a href="product-page.html" class= "click">
          <span class="card_discount_percent" id="groceries">${
            product.discountPercentage
          }%</span>
          <div class="card_image">
            <img src="${product.images[0]}" alt="${product.title}" />
          </div>
          <div class="card_description">
            <h4 class= "product_title">${product.title}</h4>
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

  productCardsGroupTwo.innerHTML = imageCardHTML;

  const productCards = document.querySelectorAll(".click");
  productCards.forEach((product) => {
    product.addEventListener("click", () => {
      const productId = product.querySelector(".product_id").textContent;
      localStorage.setItem("clickedProductId", JSON.stringify(productId));
    });
  });
};
// 


// 
const ImageCardsGroupThree = () => {
  let imageCardHTML = "";

  products.slice(20, 30).forEach((product) => {
    imageCardHTML += `
      <div class="slide_card">
        <a href="product-page.html" class= "click">
          <span class="card_discount_percent" id="gadgets">${product.discountPercentage}%</span>
          <div class="card_image">
            <img src="${product.images[0]}" alt="${product.title}" />
          </div>
          <div class="card_description">
            <h4 class= "product_title">${product.title}</h4>
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

  productCardsGroupThree.innerHTML = imageCardHTML;

  const productCards = document.querySelectorAll(".click");
  productCards.forEach((product) => {
    product.addEventListener("click", () => {
      const productId = product.querySelector(".product_id").textContent;
      localStorage.setItem("clickedProductId", JSON.stringify(productId));
    });
  });
};
// 


// 
const ImageCardsGroupFour = () => {
  let imageCardHTML = "";

  products.slice(13, 26).forEach((product) => {
    imageCardHTML += `
      <div class="slide_card">
        <a href="product-page.html" class="click">
          <span class="card_discount_percent">${
            product.discountPercentage
          }%</span>

          <div class="card_image">
            <img src="${product.images[0]}" alt="${product.title}" />
          </div>
          <div class="card_description">
            <h4 class= "product_title">${product.title}</h4>
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
  productCardsGroupFour.innerHTML = imageCardHTML;

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

const scrollLeft = container => () => {
  container.scrollBy({
    left: -cardWidth,
    behavior: "smooth",
  });
};
// 
const scrollRight = container => () => {
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



// getting product from API
const handleGetProductFromApi = async () => {
  arrow.forEach(arrow => {
    arrow.classList.add("none_elem")
  } )
  loader.forEach(loader => {
    loader.classList.add("block_elem")
  })
  try {
    const res = await fetch(`https://dummyjson.com/products`);
    const data = await res.json();
    products = data.products;
    // 
    ImageCardsGroupOne();
    ImageCardsGroupTwo()
    ImageCardsGroupThree()
    ImageCardsGroupFour()
    displaySearchedProducts();

    // 
    arrow.forEach(arrow => {
      arrow.classList.remove("none_elem")
    } )
    // 
    loader.forEach(loader => {
      loader.classList.add("none_elem")
    })
    //
     
  } catch (error) {
    console.log(error);
  }
};
handleGetProductFromApi();
// 



//
logOutBtnElem.addEventListener("click", handleLogout);
searchBarInputElem.addEventListener("change", handleSearchBoxInput);
closeSearchIcon.addEventListener("click", handleClosingSearchSection);
searchBarContainer.addEventListener("submit", handleSearchBox);