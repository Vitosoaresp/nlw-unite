import { GeneralError, StatusCode } from './general-error';

export class BadRequest extends GeneralError {
	constructor(message: string) {
		super(message, StatusCode.BAD_REQUEST);
	}
}
