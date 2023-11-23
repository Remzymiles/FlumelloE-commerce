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
  logOutBtnElem,
} = productPageHtmlElems
//

//

// Global variables
let product: IProduct;
//


// get clicked product from local storage
const clickedProductId = JSON.parse(localStorage.getItem("clickedProductId")) as Number;
//

// handle cart icon
handleCartIcon()

//handle dropdown links
handleDropdownButtonStatus();

// redirect to login page if user isn't logged in
handleRedirectIfUserIsNotLoggedIn()

// handle search box
searchFuncsAndFetchApi()



// handle image card arrows
handleProductCardArrows()

// handle displaying of other products
handleOtherProducts()


// handle get product from API by id
const handleGetProductFromApiById = async () => {
  try {
    const res = await fetch(`https://dummyjson.com/products/${clickedProductId}`);
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
