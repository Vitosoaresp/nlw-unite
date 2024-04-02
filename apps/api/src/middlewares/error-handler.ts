import { FastifyInstance } from 'fastify';
import { ZodError } from 'zod';
import { GeneralError, StatusCode } from '../utils/errors/general-error';

type FastifyErrorHandler = FastifyInstance['errorHandler'];

export const errorHandler: FastifyErrorHandler = async (
	error,
	_request,
	reply,
) => {
	if (error instanceof ZodError) {
		return reply.status(StatusCode.BAD_REQUEST).send({
			message: 'Error during validation',
			errors: error.flatten().fieldErrors,
		});
	}

	if (error instanceof GeneralError) {
		return reply.status(error.statusCode).send({
			message: error.message,
		});
	}

	return reply.status(StatusCode.INTERNAL_SERVER_ERROR).send({
		message: 'Internal server error',
	});
};
