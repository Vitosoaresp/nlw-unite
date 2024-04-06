import { AttendeeResponse, GetAttendeesParams } from '@app/types/attendee';

export const getEventAttendeesFn = async (
	params: GetAttendeesParams,
): Promise<AttendeeResponse> => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/events/${params.eventId}/attendees?` +
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
