import Joi from '@hapi/joi';
import ExpressJoiValidation from 'express-joi-validation';

const querySchema = Joi.object({
    login: Joi.string()
        .required(),
    password: Joi.string()
        .regex(/[a-zA-Z]+\d+|\d+[a-zA-Z]+/)
        .required()
        .error(errors => {
            errors.forEach(err => {
                switch (err.code) {
                    case "string.pattern.base":
                        err.message = "Password field should contain letters and numbers";
                        break;
                    default:
                        break;
                }
            });

            return errors;
        }),
    age: Joi.number()
        .integer()
        .min(4)
        .max(130)
        .required(),
});

const validator = ExpressJoiValidation.createValidator({});

export default () => validator.body(querySchema);