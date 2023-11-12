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
const orderHistoryContainer = document.querySelector<HTMLDivElement>(".orders")
const clearHistoryElem = document.querySelector<HTMLAnchorElement>("#clear_history")
const clearHistoryWarningModal = document.querySelector<HTMLDivElement>(".clear_history_modal")
const clearHistoryBtn = document.querySelector<HTMLAnchorElement>(".clear_modal a")



export const orderHistoryHtmlElems = {
    signUpBtnElem,
    logInBtnElem,
    logOutBtnElem,
    cartQuantity,
    searchBarContainer,
    searchBarInputElem,
    searchSectionContainer,
    closeSearchIcon,
    searchedItemsContainerElem,
    searchErrorMsg,
    orderHistoryContainer,
    clearHistoryElem,
    clearHistoryWarningModal,
    clearHistoryBtn,
}