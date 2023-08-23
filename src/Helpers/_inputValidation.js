export const inputEmailValidation = (email = "") => {
    const PATTERN = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    return PATTERN.test(email) ? true : false;
}