import { app } from './app';

const start = async () => {
	try {
		await app.listen({ port: 3333 }).then(() => {
			console.log('Server is running on http://localhost:3333');
		});
	} catch (error) {
		app.log.error(error);
		process.exit(1);
	}
};

start();
