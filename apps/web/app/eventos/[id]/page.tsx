import { getEvent } from '@app/service/get-events';
import { EditEventForm } from './components/edit-event-form';

export default async function Page({ params }: { params: { id: string } }) {
	const event = await getEvent(params.id);

	return (
		<div className="w-full py-4">
			<EditEventForm eventId={params.id} initialValues={event!} />
		</div>
	);
}
