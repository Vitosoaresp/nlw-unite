import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@app/components/ui/form';
import { Input } from '@app/components/ui/input';
import { Event } from '@app/eventos/[id]/components/edit-event-form/schema';
import { useFormContext } from 'react-hook-form';

export const EventForm = () => {
	const { control } = useFormContext<Event>();

	return (
		<>
			<FormField
				control={control}
				name="title"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Titulo</FormLabel>
						<FormControl>
							<Input
								{...field}
								className="bg-zinc-950/90 border-white/10 outline-none focus-visible:ring-0 focus-visible:ring-offset-transparent focus:border-white/20"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={control}
				name="details"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Descrição</FormLabel>
						<FormControl>
							<Input
								{...field}
								className="bg-zinc-950/90 border-white/10 outline-none focus-visible:ring-0 focus-visible:ring-offset-transparent focus:border-white/20"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={control}
				name="maximumAttendees"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Maximo de participantes</FormLabel>
						<FormControl>
							<Input
								{...field}
								type="number"
								className="bg-zinc-950/90 border-white/10 outline-none focus-visible:ring-0 focus-visible:ring-offset-transparent focus:border-white/20"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	);
};
