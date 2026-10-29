export function passwordValidation(password: string): (string | null | undefined) {
	if (!password) {
		return 'Password must not be empty!'
	}

	if (password.trim().length < 8) {
		return 'The required length of the password must be greater or equal to 8'
	}

  if (!/\d/.test(password)) {
    return "The password must contain a number!";
  }

  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
    return "The password must contain a upper- & lower case letter!";
  }
}
