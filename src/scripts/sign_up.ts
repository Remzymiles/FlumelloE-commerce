import "../styles/style.css";
import "font-awesome/css/font-awesome.css";
import "../assets/images/logo2.png";
import "../assets/images/flumello_favicon.png";
import { userData } from "./saveToLocalStorage";
// 

// 
const fnameInputElem = document.querySelector<HTMLInputElement>("#fname");
const lnameInputElem = document.querySelector<HTMLInputElement>("#lname");
const emailInputElem = document.querySelector<HTMLInputElement>("#email");
const passwordInputElem = document.querySelector<HTMLInputElement>("#password");
const signUpButtonElem = document.querySelector<HTMLButtonElement>(".sign-up");
const errorMsgElem = document.querySelector<HTMLDivElement>(".error-msg");
const showPasswordIcon = document.querySelector<HTMLElement>("#togglePasswordIcon");
// 

interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
// 

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

// input error checks
const fnameCheck = () => {
    if(!fnameInputElem.value){
      fnameInputElem.setAttribute("placeholder", "first name cannot be empty")
      fnameInputElem.classList.add("error-placeholder")
      fnameInputElem.classList.add("input-error")
    }else{
      fnameInputElem.classList.remove("error-placeholder")
      fnameInputElem.classList.remove("input-error")
  
  }
};
const lnameCheck = () => {
  if(!lnameInputElem.value){
    lnameInputElem.setAttribute("placeholder", "last name cannot be empty")
    lnameInputElem.classList.add("error-placeholder")
    lnameInputElem.classList.add("input-error")
  }else{
    lnameInputElem.classList.remove("error-placeholder")
    lnameInputElem.classList.remove("input-error")

  }
};
const emailCheck = () => {
  if(!regex.test(emailInput)){
    emailInputElem.setAttribute("placeholder", "email cannot be empty")
    emailInputElem.classList.add("error-placeholder")
    emailInputElem.classList.add("input-error")
  }else{
    emailInputElem.classList.remove("input-error")
  }
};
const passwordCheck = () => {
  if(!passwordInputElem.value){
    passwordInputElem.setAttribute("placeholder", "password cannot be empty")
    passwordInputElem.classList.add("error-placeholder")
    passwordInputElem.classList.add("input-error")
  }else if(!passwordRegex.test(passwordInput)){
    passwordInputElem.classList.add("input-error")
  }
  else{
    passwordInputElem.classList.remove("input-error")
  }
};

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
  fnameCheck()
  lnameCheck()
  emailCheck()
  passwordCheck()
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
    
    
    console.log(userData());
};
// 
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