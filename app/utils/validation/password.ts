export function passwordValidation(password: string): (string | null | undefined) {
  if (!password) {
    return "Password must not be empty!";
  }

  if (password.trim().length < 8) {
    return "The required length of the password must be greater or equal to 8";
  }

  if (password.search("\d") === -1) {
    console.log("Not valid number: ", password, password.search("\d") === -1);
    return "The password must contain a number!";
  }

  if (password.search("[a-z]") === -1 || password.search("[A-Z]") === -1) {
    console.log("Not valid char: ", password, password.search("[a-z]") === -1, password.search("[A-Z]") === -1)
    return "The password must contain a upper- & lower case letter!";
  }
}
