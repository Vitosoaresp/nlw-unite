import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';
import { prisma } from '../lib/prisma';

export async function getEventAttendees(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		'/events/:eventId/attendees',
		{
			schema: {
				summary: 'Get event attendees',
				tags: ['events'],
				params: z.object({
					eventId: z.string().uuid(),
				}),
				querystring: z.object({
					page: z.string().nullish().default('0').transform(Number),
					perPage: z.string().nullish().default('10').transform(Number),
					search: z.string().nullish(),
				}),
				response: {
					200: z.object({
						attendees: z.array(
							z.object({
								id: z.number(),
								name: z.string(),
								email: z.string().email(),
								createdAt: z.date(),
								checkedInAt: z.date().nullable(),
							}),
						),
						total: z.number(),
					}),
				},
			},
		},
		async (req, reply) => {
			const { eventId } = req.params;
			const { page, perPage, search } = req.query;

			const [attendees, total] = await Promise.all([
				prisma.attendee.findMany({
					select: {
						id: true,
						name: true,
						email: true,
						createdAt: true,
						checkIn: {
							select: {
								createdAt: true,
							},
						},
					},
					where: search
						? {
								eventId,
								name: {
									contains: search,
								},
							}
						: {
								eventId,
							},
					take: perPage,
					skip: page * perPage,
					orderBy: {
						createdAt: 'desc',
					},
				}),
				prisma.attendee.count({
					where: search
						? {
								eventId,
								name: {
									contains: search,
								},
							}
						: {
								eventId,
							},
				}),
			]);

			return reply.send({
				attendees: attendees.map(attendee => ({
					id: attendee.id,
					name: attendee.name,
					email: attendee.email,
					createdAt: attendee.createdAt,
					checkedInAt: attendee.checkIn?.createdAt ?? null,
				})),
				total,
			});
		},
	);
}
