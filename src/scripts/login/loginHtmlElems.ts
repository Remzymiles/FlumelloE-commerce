const emailInputElem = document.querySelector<HTMLInputElement>("#email");
const passwordInputElem = document.querySelector<HTMLInputElement>("#password");
const loginBtnElem = document.querySelector<HTMLInputElement>("#login-btn");
const errorMsgElem = document.querySelector<HTMLParagraphElement>(".invalid-details");
const showPasswordIcon = document.querySelector<HTMLElement>("#togglePasswordIcon")






export const loginHtmlElems = {
    emailInputElem,
    passwordInputElem,
    loginBtnElem,
    errorMsgElem,
    showPasswordIcon
}