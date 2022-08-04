export const errorMessage = (error) => {
	const errorCode = error.code;
	const errorMessage = error.message;
	const err = {
		errorCode,
		errorMessage,
	};
	console.error(err);
	return err;
};
