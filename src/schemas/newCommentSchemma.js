import joi from "joi"

const newCommentSchemma = joi.object({
  comment: joi.string().required(),
});

export default newCommentSchemma;