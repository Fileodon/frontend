import type { components } from '#open-fetch-schemas/api'

export type Schema<K extends keyof components['schemas']> = components['schemas'][K]
export type ApiFormResponse<T>
	= | { status: 'success', data?: T }
		| { status: 'bad_request', data: Schema<'ValidationProblemDetails'> }
		| { status: 'error', message: string }
