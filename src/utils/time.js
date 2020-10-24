export function getDate() {
	const d = new Date();
	return d.toLocaleDateString();
}

export function getTime() {
	const d = new Date();
	return d.toLocaleTimeString();
}
