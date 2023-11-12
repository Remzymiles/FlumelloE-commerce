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



export const profileHtmlElems = {
    acctNameElem,
    userEmailElem,
    userTelElem,
    userAddressElem,
    signUpBtnElem,
    logInBtnElem,
    logOutBtnElem,
    cartQuantity,
    searchBarContainer,
    searchBarInputElem,
    searchSectionContainer,
    closeSearchIcon,
    searchedItemsContainerElem,
    searchErrorMsg
}