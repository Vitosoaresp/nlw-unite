import { AttendeeList } from './components/attendee-list';

export default function Page({ params }: { params: { id: string } }) {
	return <AttendeeList eventId={params.id} />;
}
