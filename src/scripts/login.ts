import "../styles/style.css";
import "font-awesome/css/font-awesome.css";
import "../assets/images/logo2.png";
import "../assets/images/flumello_favicon.png";
import { userData } from "./saveToLocalStorage";
// 

const emailInputElem = document.querySelector<HTMLInputElement>("#email");
const passwordInputElem = document.querySelector<HTMLInputElement>("#password");
const loginBtnElem = document.querySelector<HTMLInputElement>("#login-btn");
const errorMsgElem = document.querySelector<HTMLParagraphElement>(".invalid-details");
const showPasswordCheckbox = document.querySelector<HTMLInputElement>("#show-password");
// 

let emailInput: string;
let passwordInput: string;
let regex: RegExp = /^[a-zA-Z0-9_-]+@[a-zA-z0-9-]+\.[a-z]{2,4}$/;
// 


const storedUserData = localStorage.getItem("user");
let user = JSON.parse(storedUserData);
// 

const handleEmailInput: EventListener = (e: Event) => {
    const getEmailInput = e.target as HTMLInputElement;
    emailInput = getEmailInput.value;
};

const handlePasswordInput: EventListener = (e: Event) => {
  const getPasswordInput = e.target as HTMLInputElement;
  passwordInput = getPasswordInput.value;
};
// 

//password visibility
const togglePasswordVisibility = () => {
    if (passwordInputElem.type === "password") {
      passwordInputElem.type = "text";
    } else {
      passwordInputElem.type = "password";
    }
};
// 

// input error handling
const emailCheck = () => {
    if (!regex.test(emailInput)) {
        emailInputElem.setAttribute("placeholder", "email cannot be empty");
        emailInputElem.classList.add("js_error-placeholder");
        emailInputElem.classList.add("js_input-error");
      } else {
        emailInputElem.classList.remove("js_error-placeholder");
        emailInputElem.classList.remove("js_input-error");
      }
      
};

const passwordCheck = () => {
    if (!passwordInputElem.value || userData() === null) {
      passwordInputElem.setAttribute("placeholder", "password cannot be empty");
      passwordInputElem.classList.add("js_error-placeholder");
      passwordInputElem.classList.add("js_input-error");
    }else if (passwordInputElem.value === ""){
        errorMsgElem.innerText = "";
        passwordInputElem.classList.add("js_input-error");
    }else if(passwordInputElem.value === userData().password){
      errorMsgElem.classList.remove("js_error-p");
      passwordInputElem.classList.remove("js_input-error");
      errorMsgElem.innerText = "";
    }else{
        errorMsgElem.innerText = "invalid password";
        errorMsgElem.classList.add("js_error-p");
        passwordInputElem.classList.add("js_input-error");
    }
};
//

console.log(userData());



// authenticate user details
const authenticateUser = () => {
    let isUserLoggedIn: boolean = false

    emailCheck();
    passwordCheck();
    // 

    if (userData()) {
      if (emailInput === userData().email && passwordInput === userData().password) {
        isUserLoggedIn = true;
        window.location.href = "./index.html";
      }
      localStorage.setItem ("isUserLoggedIn", JSON.stringify(isUserLoggedIn))
    }
};
//


// 
emailInputElem.addEventListener("input", handleEmailInput);
passwordInputElem.addEventListener("input", handlePasswordInput);
loginBtnElem.addEventListener("click", authenticateUser);
showPasswordCheckbox.addEventListener("click", togglePasswordVisibility);
  

