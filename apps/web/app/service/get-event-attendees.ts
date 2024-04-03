import { AttendeeResponse, GetAttendeesParams } from '@app/types/attendee';

export const getEventAttendeesFn = async (
	params: GetAttendeesParams,
): Promise<AttendeeResponse> => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees?` +
			new URLSearchParams({
				page: String(params.page - 1),
				perPage: String(params.perPage),
				search: params.search,
			}).toString(),
	);
	const data = await response.json();
	return data;
};
