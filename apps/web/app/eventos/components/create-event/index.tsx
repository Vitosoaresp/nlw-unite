'use client';

import { Button } from '@app/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogTrigger,
} from '@app/components/ui/dialog';
import { Form } from '@app/components/ui/form';
import { useToast } from '@app/components/ui/use-toast';
import {
	Event,
	eventSchema,
} from '@app/eventos/[id]/components/edit-event-form/schema';
import { createEventFn } from '@app/service/create-event';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { EventForm } from '../event-form';
import { useState } from 'react';

export const CreateEvent = () => {
	const [open, setOpen] = useState(false);
	const { toast } = useToast();
	const methods = useForm<Event>({
		resolver: zodResolver(eventSchema),
	});
	const { handleSubmit } = methods;

	const { mutateAsync: createEvent, isLoading: isCreating } = useMutation({
		mutationFn: createEventFn,
		mutationKey: ['event'],
	});

	const onSubmit = async (data: Event) => {
		try {
			await createEvent(data);
			toast({
				title: 'Evento criado com sucesso',
			});
		} catch (error) {
			toast({
				title: 'Error ao criar o evento',
				variant: 'destructive',
			});
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant="default"
					className="bg-zinc-950 border-white/10 border"
				>
					Criar um novo evento
				</Button>
			</DialogTrigger>
			<DialogContent className="bg-zinc-950 border-white/10">
				<Form {...methods}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="flex flex-col gap-4">
							<EventForm />
						</div>

						<Button
							type="submit"
							variant="outline"
							className="bg-zinc-950 mt-4"
							disabled={isCreating}
						>
							Criar evento
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
