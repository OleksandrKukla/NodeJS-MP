import Joi from '@hapi/joi';
import ExpressJoiValidation from 'express-joi-validation';

const querySchema = Joi.object({
    username: Joi.string()
        .required(),
    password: Joi.string()
        .required(),
});

const validator = ExpressJoiValidation.createValidator({});

export default () => validator.body(querySchema);