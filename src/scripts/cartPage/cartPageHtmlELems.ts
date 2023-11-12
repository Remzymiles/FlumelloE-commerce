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



export const cartPageElems = {
    signUpBtnElem,
    logInBtnElem,
    logOutBtnElem,
    productsContainerElem,
    cartQuantity,
    totalPriceContainer,
    searchBarContainer,
    searchBarInputElem,
    searchSectionContainer,
    closeSearchIcon,
    searchedItemsContainerElem,
    searchErrorMsg,
    checkoutBtn
}