import { homepageElems } from "./homepage/homepageHtmlElems";
import { homepageImports } from "./homepage/homepageImports";
import { handleProductCardArrows } from "./utility/ProductCardArrows";
import { searchFuncsAndFetchApi } from "./handleSearchFuncsAndFetchApiForSearch";
import { handleRedirectIfUserIsNotLoggedIn } from "./utility/redirectIfUserIsNotLoggedIn";
import { IProduct } from "./interface/IProduct";
import { showProducts } from "./homepage/showHomepageProducts";
//

// imports
const {
  handleLogout,
  handleDropdownButtonStatus,
  handleCartIcon,
} = homepageImports

//getting elements from html
const {
  signUpBtnElem,
  logInBtnElem,
  logOutBtnElem,
  searchBarContainer,
  searchBarInputElem,
  searchSectionContainer,
  closeSearchIcon,
  searchedItemsContainerElem,
  searchErrorMsg,
  arrow,
  productCardsGroupOne,
  productCardsGroupTwo,
  productCardsGroupThree,
  productCardsGroupFour,
  loader,
  cartQuantity
} = homepageElems
// 

// Global variables
let products: IProduct[];

//handle redirect if user isn't logged in
handleRedirectIfUserIsNotLoggedIn()

// handle main product image card arrows
handleProductCardArrows()

// handle cart icon
handleCartIcon(cartQuantity);

//handle dropdown links
handleDropdownButtonStatus(signUpBtnElem, logInBtnElem);
//

// handle search box
searchFuncsAndFetchApi({
  products,
  searchBarContainer,
  searchBarInputElem,
  searchSectionContainer,
  closeSearchIcon,
  searchedItemsContainerElem,
  searchErrorMsg,
})
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
  };

  const nextSlide = () => {
    currentSlide++;
    goToSlide(currentSlide);
  };

  const prevSlide = () => {
    currentSlide--;
    goToSlide(currentSlide);
  };

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

//fetch from api to display all products 
const handleGetProductFromApi = async () => {
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
    //
    showProducts({
      products,
      productCardsGroupOne,
      productCardsGroupTwo,
      productCardsGroupThree,
      productCardsGroupFour,
    });

    //
    arrow.forEach((arrow) => {
      arrow.classList.remove("none_elem");
    });
    //
    loader.forEach((loader) => {
      loader.classList.add("none_elem");
    });
    //
  } catch (error) {
    console.log(error);
  }
};
handleGetProductFromApi();

//
logOutBtnElem.addEventListener("click", handleLogout);
