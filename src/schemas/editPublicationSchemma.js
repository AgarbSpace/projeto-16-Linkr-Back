import joi from "joi"

const editPublicationSchema = joi.object({
  text: joi.string().required(),
});

export default editPublicationSchema;