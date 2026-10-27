import type { components } from '#open-fetch-schemas/api'

export type Schema<K extends keyof components['schemas']> = components['schemas'][K]