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




export const productPageHtmlElems = {
    signUpBtnElem,
    logInBtnElem ,
    logOutBtnElem,
    productDetailsContainer,
    productDesc,
    otherProductsContainer,
    scrollContainer,
    loader,
    leftArrow,
    rightArrow,
    arrow,
    searchBarInputElem,
    searchBarContainer,
    searchSectionContainer,
    closeSearchIcon,
    searchedItemsContainerElem,
    searchErrorMsg,
    cartQuantity
}