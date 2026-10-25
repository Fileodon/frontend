export function emailValidation(email: string | undefined): (string | null | undefined) {
  if (!email || email.trim().length == 0) {
    return "Email input must not be empty!";
  }

  if (!email.includes('@')) {
    return "Email must contain '@'!";
  }

  if (!email.includes('.')) {
    return "Email must contain '.'!";
  }
}
