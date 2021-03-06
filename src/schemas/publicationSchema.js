import joi from "joi"

const publicationSchema = joi.object({
  userId: joi.string().required(),
  link: joi.string().uri().required(),
  text: joi.string(),
});

export default publicationSchema;