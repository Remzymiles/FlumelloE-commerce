import { IProduct } from "./interface/IProduct";
import { displaySearchedProducts } from "./utility/displaySearchFunction";
//

let products: IProduct[];

//
interface ISearch {
  products: IProduct[];
  searchBarContainer: HTMLFormElement;
  searchBarInputElem: HTMLInputElement;
  searchSectionContainer: HTMLDivElement;
  closeSearchIcon: HTMLElement;
  searchedItemsContainerElem: HTMLDivElement;
  searchErrorMsg: HTMLParagraphElement;
}


// 
export const searchFuncsAndFetchApi = ({
  products,
  searchBarContainer,
  searchBarInputElem,
  searchSectionContainer,
  closeSearchIcon,
  searchedItemsContainerElem,
  searchErrorMsg,
}: ISearch) => {
let getSearchInput: string;

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
    try {
      const res = await fetch(`https://dummyjson.com/products`);
      const data = await res.json();
      products = data.products;
      //
      displaySearchedProducts(
        products,
        searchBarInputElem.value.toLowerCase(),
        searchedItemsContainerElem,
        searchErrorMsg
      );

    } catch (error) {
      console.log(error);
    }
  };
  handleGetProductFromApi();
};
