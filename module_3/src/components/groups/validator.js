import Joi from '@hapi/joi';
import ExpressJoiValidation from 'express-joi-validation';

const querySchema = Joi.object({
    name: Joi.string()
        .required(),
    permissions: Joi.array()
        .required(),
});

const validator = ExpressJoiValidation.createValidator({});

export default () => validator.body(querySchema);