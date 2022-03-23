import joi from "joi"

const signUpFormSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    name: joi.string().required(),
    url: joi.string().uri().required()
});

export default signUpFormSchema;