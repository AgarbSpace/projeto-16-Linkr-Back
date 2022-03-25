import joi from "joi"

const signInFormSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

export default signInFormSchema;