import { handleGetAllProductsFromApi} from "./fetchAllProductsFromApi";
import { homepageElems } from "./homepage/homepageHtmlElems";
import { IProduct } from "./interface/IProduct";
import { displaySearchedProducts } from "./utility/displaySearchFunction";
//

const {
  searchBarContainer,
  searchBarInputElem,
  searchSectionContainer,
  closeSearchIcon,
  searchedItemsContainerElem,
  searchErrorMsg,
} = homepageElems

let products: IProduct[];


// 
export const searchFuncsAndFetchApi = () => {
let searchInputValue: string;

  const handleSearchedProductsContainer: EventListener = async (e: Event)=> {
    e.preventDefault();
    //
    searchInputValue
      ? searchSectionContainer.classList.add("block_elem")
      : searchSectionContainer.classList.remove("block_elem");
    //

    try {
      const allProducts = await handleGetAllProductsFromApi();

      if (allProducts) {
        products = allProducts;
  
        // Display searched products
        displaySearchedProducts(
          products,
          searchBarInputElem.value.toLowerCase(),
          searchedItemsContainerElem,
          searchErrorMsg
        );
      } 
    } catch (error) {
      console.log(error);
    }
  };
  //

  // get user input
  const handleSearchBoxInput: EventListener = (e: Event): void => {
    const searchInput = e.target as HTMLInputElement;
    searchInputValue = searchInput.value;
  };
  //

  // close the search section when the x icon is clicked
  const handleClosingSearchSection: EventListener = (): void => {
    searchSectionContainer.classList.add("none_elem");
  };
  //

  searchBarInputElem.addEventListener("change", handleSearchBoxInput);
  closeSearchIcon.addEventListener("click", handleClosingSearchSection);
  searchBarContainer.addEventListener("submit", handleSearchedProductsContainer);

};
