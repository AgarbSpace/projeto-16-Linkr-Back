import joi from "joi";

const likePostSchema = joi.object({
    userId: joi.number().required()
});

export default likePostSchema;