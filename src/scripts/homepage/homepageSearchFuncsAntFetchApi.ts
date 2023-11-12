import { homepageElems } from "./homepageHtmlElems";
import { IProduct } from "../interface/IProduct";
import { showProducts } from "./showHomepageProducts";
import { displaySearchedProducts } from "../utility/displaySearchFunction";
// 

let getSearchInput: string;
let products: IProduct[];


// 
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
  } = homepageElems

// 

export const homepageSearchFuncsAndFetchApi = () =>{
    const handleSearchBox: EventListener = (e: Event): void => {
        e.preventDefault();
        //
        getSearchInput
          ? searchSectionContainer.classList.add("block_elem")
          : searchSectionContainer.classList.remove("block_elem");
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

searchBarInputElem.addEventListener("change", handleSearchBoxInput);
closeSearchIcon.addEventListener("click", handleClosingSearchSection);
searchBarContainer.addEventListener("submit", handleSearchBox);

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
    showProducts({products,productCardsGroupOne,productCardsGroupTwo,productCardsGroupThree,productCardsGroupFour})
    displaySearchedProducts(
      products,
      searchBarInputElem.value.toLowerCase(),
      searchedItemsContainerElem,
      searchErrorMsg
    );

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
handleGetProductFromApi()
}
