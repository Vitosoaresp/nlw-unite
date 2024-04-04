import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';
import { prisma } from '../lib/prisma';

export async function getEvents(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		'/events',
		{
			schema: {
				summary: 'Get events',
				tags: ['events'],
				querystring: z.object({
					page: z.string().nullish().default('0').transform(Number),
					perPage: z.string().nullish().default('10').transform(Number),
					search: z.string().nullish(),
					orderBy: z.enum(['id', 'title', 'details']).nullish().default('id'),
					sort: z.enum(['asc', 'desc']).nullish().default('desc'),
				}),
				response: {
					200: z.object({
						events: z.array(
							z.object({
								id: z.string().uuid(),
								title: z.string(),
								slug: z.string(),
								details: z.string().nullable(),
							}),
						),
						total: z.number(),
					}),
				},
			},
		},
		async (req, reply) => {
			const { page, perPage, search, orderBy, sort } = req.query;

			const [events, total] = await Promise.all([
				prisma.event.findMany({
					select: {
						id: true,
						title: true,
						details: true,
						slug: true,
					},
					where: search
						? {
								title: {
									contains: search,
								},
							}
						: {},
					take: perPage,
					skip: page * perPage,
					orderBy: orderBy
						? {
								[orderBy]: sort,
							}
						: {},
				}),
				prisma.event.count({
					where: search
						? {
								title: {
									contains: search,
								},
							}
						: {},
				}),
			]);

			return reply.send({
				events,
				total,
			});
		},
	);
}
