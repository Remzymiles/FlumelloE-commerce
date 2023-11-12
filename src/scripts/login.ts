import { loginHtmlElems } from "./login/loginHtmlElems";
import { loginImports } from "./loginImports";

// 
const {
  emailInputElem,
  passwordInputElem,
  loginBtnElem,
  errorMsgElem,
  showPasswordIcon
} = loginHtmlElems
// 

const {
  userData
} = loginImports

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
showPasswordIcon.addEventListener("click", togglePasswordVisibility);

