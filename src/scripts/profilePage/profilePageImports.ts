import "../../styles/style.css";
import "font-awesome/css/font-awesome.css";
import "../../assets/images/logo2.png";
import { userData} from "../utility/saveToLocalStorage";
import { storedUserLoginStatus } from "../utility/saveToLocalStorage";
import { displaySearchedProducts } from "../utility/displaySearchFunction";
import { handleLogout } from "../utility/handleLogoutAndDropdownFunc";
import { handleRedirectIfUserIsNotLoggedIn } from "../utility/redirectIfUserIsNotLoggedIn";
import { handleDropdownButtonStatus } from "../utility/handleLogoutAndDropdownFunc";
import { handleCartIcon } from "../utility/handleLogoutAndDropdownFunc";




export const profilePageImports = {
    userData,
    storedUserLoginStatus,
    displaySearchedProducts,
    handleLogout,
    handleDropdownButtonStatus,
    handleCartIcon,
    handleRedirectIfUserIsNotLoggedIn
}