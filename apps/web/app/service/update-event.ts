import { Event } from '@app/types/event';

export const updateEventFn = async (event: Event): Promise<void> => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/events/${event.id}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(event),
			},
		);
		const data = await response.json();
		if (data.message || response.status !== 200) {
			throw new Error(data.message ?? 'Error ao atualizar o evento');
		}
		return data;
	} catch (e: any) {
		throw new Error(e?.message);
	}
};
