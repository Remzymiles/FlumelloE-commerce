const signUpBtnElem = document.querySelector<HTMLLinkElement>(".signup-btn");
const logInBtnElem = document.querySelector<HTMLElement>(".login-btn");
const logOutBtnElem = document.querySelector<HTMLElement>(".logout-btn");
const fullnameInputElem = document.querySelector<HTMLInputElement>("#name")
const emailInputElem = document.querySelector<HTMLInputElement>("#email")
const telephoneElem = document.querySelector<HTMLInputElement>("#telephone")
const addressElem = document.querySelector<HTMLInputElement>("#address")
const payBtnElem = document.querySelector<HTMLInputElement>(".pay")
const cartQuantity = document.querySelector<HTMLSpanElement>(".cart-link span");
const searchBarContainer = document.querySelector<HTMLFormElement>(".search_box");
const searchBarInputElem = document.querySelector<HTMLInputElement>("#search");
const searchSectionContainer = document.querySelector<HTMLDivElement>(".searched_item_container");
const closeSearchIcon = document.querySelector<HTMLElement>(".close_search_icon");
const searchedItemsContainerElem = document.querySelector<HTMLDivElement>(".search_items");
const searchErrorMsg = document.querySelector<HTMLDivElement>(".search_error_msg");
const checkoutPricingContainer = document.querySelector<HTMLDivElement>(".pricing")
const paymentSuccessModal = document.querySelector<HTMLDivElement>(".payment_modal")
const checkoutProductDetails = document.querySelector<HTMLDivElement>(".checkout_products")
const checkoutQuantity = document.querySelector<HTMLHeadingElement>(".checkout_quantity")



export const checkoutHtmlElems = {
    signUpBtnElem,
    logInBtnElem,
    logOutBtnElem,
    fullnameInputElem,
    emailInputElem,
    telephoneElem,
    addressElem,
    payBtnElem,
    cartQuantity,
    searchBarContainer,
    searchBarInputElem,
    searchSectionContainer,
    closeSearchIcon,
    searchedItemsContainerElem,
    searchErrorMsg,
    checkoutPricingContainer,
    paymentSuccessModal,
    checkoutProductDetails,
    checkoutQuantity
}