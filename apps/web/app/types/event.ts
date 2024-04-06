export interface Event {
	id?: string;
	title: string;
	details?: string;
	maximumAttendees?: number;
}

export interface EventsResponse {
	events: Event[];
	total: number;
}

export interface GetEventsParams {
	search: string;
	page: number;
	perPage: number;
	orderBy: string;
	sort: string;
}
