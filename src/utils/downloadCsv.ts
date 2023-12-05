import { Character, Maybe } from '../api'

export const downloadCSV = (data: Maybe<Character>[], fileName: string) => {
	const csvContent = [
		'id,name,gender,status,species,origin,location,created', // CSV header
		...data.map(character =>
			[
				character?.id,
				character?.name,
				character?.gender,
				character?.status,
				character?.species,
				character?.origin?.name || '',
				character?.location?.name || '',
				character?.created || ''
			].join(',')
		)
	].join('\n')

	const blob = new Blob([csvContent], { type: 'text/csv' })
	const url = URL.createObjectURL(blob)

	const link = document.createElement('a')
	link.href = url
	link.download = fileName
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
	URL.revokeObjectURL(url)
}
