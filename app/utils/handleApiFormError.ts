import { FetchError } from 'ofetch'

export default function<T>(err: unknown): ApiFormResponse<T> {
	if (err instanceof FetchError) {
		const data = err.data as Schema<'ValidationProblemDetails'>
		if (err.statusCode === 400) {
			return { status: 'bad_request', data: data }
		}
		return { status: 'error', message: data.title ?? err.message }
	}

	return {
		status: 'error',
		message: 'unknown error occured',
	}
}
