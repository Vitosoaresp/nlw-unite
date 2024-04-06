'use client';

import { Button } from '@app/components/ui/button';
import { Form } from '@app/components/ui/form';
import { useToast } from '@app/components/ui/use-toast';
import { EventForm } from '@app/eventos/components/event-form';
import { updateEventFn } from '@app/service/update-event';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Event, eventSchema } from './schema';

export function EditEventForm({
	eventId,
	initialValues,
}: {
	eventId?: string;
	initialValues?: Event;
}) {
	const navigate = useRouter();
	const { toast } = useToast();

	const { mutateAsync: updateEvent, isLoading: isUpdating } = useMutation({
		mutationFn: updateEventFn,
		mutationKey: ['event'],
	});

	const methods = useForm<z.infer<typeof eventSchema>>({
		resolver: zodResolver(eventSchema),
		defaultValues: initialValues,
	});

	const { handleSubmit } = methods;

	const handleUpdate = async (data: z.infer<typeof eventSchema>) => {
		try {
			await updateEvent({ ...data, id: eventId });
			navigate.push('/eventos');
			toast({
				title: 'Evento atualizado com sucesso',
			});
		} catch (error) {
			toast({
				title: 'Error ao atualizar o evento',
				variant: 'destructive',
			});
		}
	};

	return (
		<Form {...methods}>
			<form onSubmit={handleSubmit(handleUpdate)}>
				<div className="grid grid-cols-3 gap-4">
					<EventForm />
				</div>

				<Button
					type="submit"
					variant="outline"
					className="bg-zinc-950 mt-4"
					disabled={isUpdating}
				>
					Salvar
				</Button>
			</form>
		</Form>
	);
}
