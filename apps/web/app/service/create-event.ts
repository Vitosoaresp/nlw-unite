import { Event } from '@app/types/event';

export const createEventFn = async (event: Event): Promise<void> => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(event),
	});
	const data = await response.json();
	return data;
};
