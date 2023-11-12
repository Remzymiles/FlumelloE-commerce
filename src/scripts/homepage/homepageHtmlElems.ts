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
const loader = document.querySelectorAll<HTMLElement>(".product_loader");
const cartQuantity = document.querySelector<HTMLSpanElement>(".cart-link span");
//




export const homepageElems = {
    signUpBtnElem,
    logInBtnElem,
    logOutBtnElem,
    searchBarContainer,
    searchBarInputElem,
    searchSectionContainer,
    closeSearchIcon,
    searchedItemsContainerElem,
    searchErrorMsg,
    scrollContainer,
    leftArrow,
    rightArrow,
    arrow,
    productCardsGroupOne,
    productCardsGroupTwo,
    productCardsGroupThree,
    productCardsGroupFour,
    loader,
    cartQuantity
}