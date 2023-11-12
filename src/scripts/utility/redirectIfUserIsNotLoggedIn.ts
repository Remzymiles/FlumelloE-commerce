import { homepageImports } from "../homepageImports";

const {
    storedUserLoginStatus,
} = homepageImports

export const handleRedirectIfUserIsNotLoggedIn = () =>{
    storedUserLoginStatus === null || storedUserLoginStatus === false
  ? (window.location.href = "./sign-up.html")
  : null;
}