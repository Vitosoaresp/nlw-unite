import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';
import { prisma } from '../lib/prisma';
import { BadRequest } from '../utils/errors/bad-request';
import { generateSlug } from '../utils/generate-slug';

export async function updateEvent(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().put(
		'/events/:eventId',
		{
			schema: {
				summary: 'Update an event',
				tags: ['events'],
				params: z.object({
					eventId: z.string().uuid(),
				}),
				body: z.object({
					title: z.string().min(4),
					details: z.string().nullable(),
					maximumAttendees: z.number().int().positive().nullable(),
				}),
				response: {
					200: z.object({
						eventId: z.string().uuid(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { title, details, maximumAttendees } = request.body;
			const { eventId } = request.params;

			const slug = generateSlug(title);

			const eventWithSameSlug = await prisma.event.findUnique({
				where: { slug, NOT: { id: eventId } },
			});

			if (eventWithSameSlug !== null) {
				throw new BadRequest('Event with the same title already exists');
			}

			const amountOfAttendeesForEvent = await prisma.attendee.count({
				where: {
					eventId,
				},
			});

			if (maximumAttendees && maximumAttendees > amountOfAttendeesForEvent) {
				throw new BadRequest(
					'The maximum attendees cannot be lower than the current amount of attendees',
				);
			}

			const event = await prisma.event.update({
				where: {
					id: eventId,
				},
				data: {
					title,
					details,
					maximumAttendees,
					slug,
				},
			});

			return reply.status(200).send({ eventId: event.id });
		},
	);
}
