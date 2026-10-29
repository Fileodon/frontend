import { describe, expect, it } from 'vitest'
import { passwordValidation } from '../../app/utils/validation/password'

describe('passwordValidation', () => {
	it.each([
		['', 'Password must not be empty!'],
		['Short1A', 'The required length of the password must be greater or equal to 8'],
		['Password', 'The password must contain a number!'],
		['PASSWORD1', 'The password must contain a upper- & lower case letter!'],
		['password1', 'The password must contain a upper- & lower case letter!'],
	])('returns the validation error for %s', (password, expectedError) => {
		expect(passwordValidation(password)).toBe(expectedError)
	})

	it('accepts a password with at least eight characters, a number, and both cases', () => {
		expect(passwordValidation('Password1')).toBeUndefined()
	})
})
