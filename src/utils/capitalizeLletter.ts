export const capitalizeString = (inputString: string) => {
	if (inputString && typeof inputString === 'string') {
		return inputString.charAt(0).toUpperCase() + inputString.slice(1)
	} else {
		return inputString // Return the input unchanged if it's not a non-empty string
	}
}
