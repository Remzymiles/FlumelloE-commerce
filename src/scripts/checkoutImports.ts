import "../styles/style.css"
import "font-awesome/css/font-awesome.css";
import "../assets/images/logo2.png";
import "../assets/images/flumello_favicon.png";
import { storedUserLoginStatus } from "./utility/saveToLocalStorage";
import { displaySearchedProducts } from "./utility/displaySearchFunction";
import { handleCartIcon } from "./utility/handleLogoutAndDropdownFunc";
import { handleLogout } from "./utility/handleLogoutAndDropdownFunc";
import { handleDropdownButtonStatus } from "./utility/handleLogoutAndDropdownFunc";



export const checkoutImports = {
    storedUserLoginStatus,
    displaySearchedProducts,
    handleCartIcon,
    handleLogout,
    handleDropdownButtonStatus
}