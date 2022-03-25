export function validateSchemaMiddleware(schema) {
  return (request, response, next) => {
    const validation = schema.validate(request.body);
    if (validation.error) {
      const error = validation.error.details.map(error => error.message)
      return response.status(422).send(error);
    }

    next();
  }
}