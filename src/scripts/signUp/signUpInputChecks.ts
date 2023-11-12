import { signUpHtmlElems } from "./signUpHtmlElems";


const {
    fnameInputElem,
    lnameInputElem,
    emailInputElem,
    passwordInputElem,
    showPasswordIcon
} = signUpHtmlElems


let regex: RegExp = /^[a-zA-Z0-9_-]+@[a-zA-z0-9-]+\.[a-z]{2,4}$/;
let passwordRegex: RegExp = /^[a-zA-Z0-9_-]{5,20}$/;


export const signUpInputChecks = (emailInput,passwordInput) =>{
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
        showPasswordIcon.classList.add("block_elem")
      }else if(!passwordRegex.test(passwordInput)){
        passwordInputElem.classList.add("input-error")
        showPasswordIcon.classList.add("block_elem")
      }
      else{
        passwordInputElem.classList.remove("input-error")
      }
    }
    fnameCheck()
    lnameCheck()
    emailCheck()
    passwordCheck()
}