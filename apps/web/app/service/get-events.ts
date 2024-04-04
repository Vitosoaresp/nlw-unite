import { EventsResponse, GetEventsParams } from '@app/types/event';

export const getEventsFn = async (
	params: GetEventsParams,
): Promise<EventsResponse> => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/events?` +
			new URLSearchParams({
				page: String(params.page - 1),
				perPage: String(params.perPage),
				search: params.search,
				orderBy: params.orderBy,
				sort: params.sort,
			}).toString(),
	);
	const data = await response.json();
	return data;
};
