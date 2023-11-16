import "../../styles/style.css"
import "font-awesome/css/font-awesome.css";
import "../../assets/images/logo2.png";
import "../../assets/images/flumello_favicon.png";
import { storedUserLoginStatus } from "../utility/saveToLocalStorage";
import { displaySearchedProducts } from "../utility/displaySearchFunction";
import { handleLogout } from "../utility/handleLogoutAndDropdownFunc";
import { handleDropdownButtonStatus } from "../utility/handleLogoutAndDropdownFunc";
import { handleCartIcon } from "../utility/handleLogoutAndDropdownFunc";



export const orderHistoryImports = {
    storedUserLoginStatus,
    displaySearchedProducts,
    handleLogout,
    handleDropdownButtonStatus,
    handleCartIcon
}