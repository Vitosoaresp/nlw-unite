import { z } from 'zod';

export const eventSchema = z.object({
	title: z
		.string({
			required_error: 'O título é obrigatório',
		})
		.min(3, 'O título deve ter no mínimo 3 caracteres')
		.trim(),
	details: z.string().optional(),
	maximumAttendees: z.number().int().positive().gte(1).optional(),
});

export type Event = z.infer<typeof eventSchema>;
