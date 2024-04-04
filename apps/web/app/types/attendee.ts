export interface Attendee {
	id: number;
	name: string;
	email: string;
	createdAt: string;
	checkedInAt: string | null;
}

export interface AttendeeResponse {
	attendees: Attendee[];
	total: number;
}

export interface GetAttendeesParams {
	search: string;
	page: number;
	perPage: number;
	orderBy: string;
	sort: string;
}
