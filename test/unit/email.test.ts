import { describe, expect, it } from 'vitest'
import { emailValidation } from '../../app/utils/validation/email'

describe('emailValidation', () => {
	it.each([
		[undefined, 'Email input must not be empty!'],
		['', 'Email input must not be empty!'],
		['   ', 'Email input must not be empty!'],
		['user.example.com', 'Email must contain \'@\'!'],
		['user@example', 'Email must contain \'.\'!'],
	])('returns the validation error for %s', (email, expectedError) => {
		expect(emailValidation(email)).toBe(expectedError)
	})

	it('accepts an email containing an at sign and a dot', () => {
		expect(emailValidation('user@example.com')).toBeUndefined()
	})
})
