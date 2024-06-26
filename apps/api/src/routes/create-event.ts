import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';
import { prisma } from '../lib/prisma';
import { BadRequest } from '../utils/errors/bad-request';
import { generateSlug } from '../utils/generate-slug';

export async function createEvent(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		'/events',
		{
			schema: {
				summary: 'Create a new event',
				tags: ['events'],
				body: z.object({
					title: z.string().min(4),
					details: z.string().nullable(),
					maximumAttendees: z.number().int().positive().nullable(),
				}),
				response: {
					201: z.object({
						eventId: z.string().uuid(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { title, details, maximumAttendees } = request.body;

			const slug = generateSlug(title);

			const eventWithSameSlug = await prisma.event.findUnique({
				where: { slug },
			});

			if (eventWithSameSlug !== null) {
				throw new BadRequest('Event with the same title already exists');
			}

			const event = await prisma.event.create({
				data: {
					title,
					details,
					maximumAttendees,
					slug,
				},
			});

			return reply.status(201).send({ eventId: event.id });
		},
	);
}
