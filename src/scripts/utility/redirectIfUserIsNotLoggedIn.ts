import { homepageImports } from "../homepage/homepageImports";

const {
    storedUserLoginStatus,
} = homepageImports

export const handleRedirectIfUserIsNotLoggedIn = () =>{
    storedUserLoginStatus === null || storedUserLoginStatus === false
  ? (window.location.href = "./sign-up.html")
  : null;
}