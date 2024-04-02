export enum StatusCode {
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	INTERNAL_SERVER_ERROR = 500,
}

export class GeneralError {
	message: string;
	statusCode: StatusCode;

	constructor(message: string, statusCode: StatusCode) {
		this.message = message;
		this.statusCode = statusCode;
	}
}
