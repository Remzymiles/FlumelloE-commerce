const fnameInputElem = document.querySelector<HTMLInputElement>("#fname");
const lnameInputElem = document.querySelector<HTMLInputElement>("#lname");
const emailInputElem = document.querySelector<HTMLInputElement>("#email");
const passwordInputElem = document.querySelector<HTMLInputElement>("#password");
const signUpButtonElem = document.querySelector<HTMLButtonElement>(".sign-up");
const errorMsgElem = document.querySelector<HTMLDivElement>(".error-msg");
const showPasswordIcon = document.querySelector<HTMLElement>("#togglePasswordIcon");




export const signUpHtmlElems = {
    fnameInputElem,
    lnameInputElem,
    emailInputElem,
    passwordInputElem,
    signUpButtonElem,
    errorMsgElem,
    showPasswordIcon
}