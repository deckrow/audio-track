export const currentLocalTime = (time: Date) =>
	new Date(time).toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	});
