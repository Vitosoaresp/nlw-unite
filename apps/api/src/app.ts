import fastifyCors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastify from 'fastify';
import {
	ZodTypeProvider,
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from 'fastify-type-provider-zod';
import { errorHandler } from './middlewares/error-handler';
import { checkIn } from './routes/check-in';
import { createEvent } from './routes/create-event';
import { getAttendeeBadge } from './routes/get-attendee-badge';
import { getEvent } from './routes/get-event';
import { getEventAttendees } from './routes/get-event-attendees';
import { getEvents } from './routes/get-events';
import { registerForEvent } from './routes/register-for-event';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
	origin: '*',
});

app.register(fastifySwagger, {
	swagger: {
		consumes: ['application/json'],
		produces: ['application/json'],
		info: {
			title: 'Unite API',
			description:
				'Especificações da API construída durante o NLW Unite da Rocketseat.',
			version: '1.0.0',
		},
	},
	transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
	routePrefix: '/docs',
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createEvent);
app.register(getEvent);
app.register(registerForEvent);
app.register(getAttendeeBadge);
app.register(checkIn);
app.register(getEventAttendees);
app.register(getEvents);

app.get('/', async (request, reply) => {
	return { hello: 'world' };
});

app.setErrorHandler(errorHandler);

export { app };
