import { signUpHtmlElems } from "./signUp/signUpHtmlElems";
import { signUpImports } from "./signUp/signUpImports";
import { IUser } from "./interface/IUser";
import { signUpInputChecks } from "./signUp/signUpInputChecks";
// 

const {
  fnameInputElem,
  lnameInputElem,
  emailInputElem,
  passwordInputElem,
  signUpButtonElem,
  errorMsgElem,
  showPasswordIcon
} = signUpHtmlElems
// 

const {
  userData
} = signUpImports
// 

// Global variables
let fnameInput: string;
let lnameInput: string;
let emailInput: string;
let passwordInput: string;
let regex: RegExp = /^[a-zA-Z0-9_-]+@[a-zA-z0-9-]+\.[a-z]{2,4}$/;
let passwordRegex: RegExp = /^[a-zA-Z0-9_-]{5,20}$/;
let user: IUser;
// 

const handleFnameInput: EventListener = (e: Event) => {
    const getFnameInput = e.target as HTMLInputElement;
    fnameInput = getFnameInput.value;
};
//
const handleLnameInput: EventListener = (e: Event) => {
  const getLnameInput = e.target as HTMLInputElement;
  lnameInput = getLnameInput.value;
};
//
const handleEmailInput: EventListener = (e: Event) => {
  const getEmailInput = e.target as HTMLInputElement;
  emailInput = getEmailInput.value;
};
//
const handlePasswordInput: EventListener = (e: Event) => {
  const getPasswordInput = e.target as HTMLInputElement;
  passwordInput = getPasswordInput.value;
};
// 

// save user to localStorage
const saveUserToLocalStorage = () => {localStorage.setItem("user", JSON.stringify(user))};
// 

// handle getting or storing new user data in localStorage
const handleLocalStorage = () => {
  let isUserLoggedIn = false
  if (userAlreadyExisting === null) {
    saveUserToLocalStorage();
    window.location.href = "login.html"
    localStorage.setItem ("isUserLoggedIn", JSON.stringify(isUserLoggedIn))
  } else if (emailInputElem.value === userData().email) {
    errorMsgElem.classList.add("block_elem");
  } else{
    saveUserToLocalStorage();
    window.location.href = "login.html"
    localStorage.setItem ("isUserLoggedIn", JSON.stringify(isUserLoggedIn))
  }
  
}
// 

//password visibility
const togglePasswordVisibility:EventListener = (e:Event):void =>{
  if (passwordInputElem.type === "password") {
    passwordInputElem.type = "text";
    showPasswordIcon.classList.remove("fa-eye")
    showPasswordIcon.classList.add("fa-eye-slash")
  } else {
    passwordInputElem.type = "password";
    showPasswordIcon.classList.add("fa-eye")
    showPasswordIcon.classList.remove("fa-eye-slash")
  }
}
// 

// handle user details
const handleSignUpBtn = () => {
  signUpInputChecks(emailInput,passwordInput)
  showPasswordIcon.classList.add("block_elem")
  
  // 
  if (fnameInputElem.value &&
    lnameInputElem.value &&
    emailInputElem.value &&
    passwordInputElem.value){
      user = {
        firstName: fnameInput,
        lastName: lnameInput,
        email: emailInput,
        password: passwordInput,
      };
      // 
      handleLocalStorage()
      // 
      fnameInputElem.value = "";
      lnameInputElem.value = "";
      emailInputElem.value = "";
      passwordInputElem.value = "";
    }
};

// get user data from local storage
const userAlreadyExisting = JSON.parse(localStorage.getItem("user"))
// 

//
fnameInputElem?.addEventListener("change", handleFnameInput);
lnameInputElem?.addEventListener("change", handleLnameInput);
emailInputElem?.addEventListener("change", handleEmailInput);
passwordInputElem?.addEventListener("change", handlePasswordInput);
showPasswordIcon.addEventListener("click", togglePasswordVisibility);
signUpButtonElem?.addEventListener("click", handleSignUpBtn);