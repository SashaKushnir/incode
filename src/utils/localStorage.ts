import { FilteringConfig } from '../components/forms/CharactersFilter/CharactersFilter'

export type History = Array<
	Partial<FilteringConfig & { name: string; id: string }>
>

export interface LocalStoreState {
	history: History
}

export class LocalStore {
	static set<K extends keyof LocalStoreState>(
		key: K,
		value: LocalStoreState[K]
	) {
		if (typeof window !== 'undefined') {
			localStorage.setItem(key, JSON.stringify(value))
		}
	}

	static get<T extends keyof LocalStoreState>(
		key: T
	): LocalStoreState[T] | undefined {
		if (typeof window !== 'undefined') {
			const value = localStorage.getItem(key)

			if (typeof value === 'string') {
				return JSON.parse(value)
			}
		}

		return undefined
	}
}
