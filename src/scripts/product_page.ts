import { IProduct } from "./interface/IProduct";
import { productPageHtmlElems } from "./productPage/productPageHtmlELems";
import { productPageImports } from "./productPage/productPageImports";
import { handleOtherProducts } from "./productPage/otherProducts";
import { searchFuncsAndFetchApi } from "./handleSearchFuncsAndFetchApiForSearch";
import { handleProduct } from "./productPage/handleProductDetails";
import { handleRedirectIfUserIsNotLoggedIn } from "./utility/redirectIfUserIsNotLoggedIn";
//

const {
  handleLogout,
  handleDropdownButtonStatus,
  handleCartIcon,
  handleProductCardArrows
} = productPageImports

const {
  signUpBtnElem,
  logInBtnElem ,
  logOutBtnElem,
  searchBarInputElem,
  searchBarContainer,
  searchSectionContainer,
  closeSearchIcon,
  searchedItemsContainerElem,
  searchErrorMsg,
  cartQuantity
} = productPageHtmlElems
//

//

// Global variables
let products: IProduct[];
let product: IProduct;
//


// get clicked product from local storage
const clickedProduct = JSON.parse(localStorage.getItem("clickedProductId"));
const productId = Number(clickedProduct);
//

// handle cart icon
handleCartIcon(cartQuantity)

//handle dropdown links
handleDropdownButtonStatus(signUpBtnElem,logInBtnElem);

// redirect to login page if user isn't logged in
handleRedirectIfUserIsNotLoggedIn()

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


// handle image card arrows
handleProductCardArrows()

// handle displaying of other products
handleOtherProducts()


// handle get product from API by id
const handleGetProductFromApiById = async () => {
  try {
    const res = await fetch(`https://dummyjson.com/products/${productId}`);
    const data = await res.json();
    product = data;

    handleProduct(product);

  } catch (error) {
    console.error("An error occurred:", error);
  }
};
handleGetProductFromApiById();
//

//
logOutBtnElem.addEventListener("click", handleLogout);
