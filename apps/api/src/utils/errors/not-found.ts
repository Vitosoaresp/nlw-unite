import { GeneralError, StatusCode } from './general-error';

export class NotFound extends GeneralError {
	constructor(message: string) {
		super(message, StatusCode.NOT_FOUND);
	}
}
