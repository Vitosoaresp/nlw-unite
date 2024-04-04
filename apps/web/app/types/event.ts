export interface Event {
	id: number;
	title: string;
	details?: string;
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
