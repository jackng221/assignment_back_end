const {Validator, ValidationError} = require('jsonschema');
const dogSchema = require('../schemas/dog.schema.js');
const userSchema = require('../schemas/user.schema.js');
const v = new Validator();

exports.validateDogEntry = async (ctx, next) => {

  const validationOptions = {
    throwError: true,
    allowUnknownAttributes: false
  };

  const body = ctx.request.body;

  try {
    v.validate(body, dogSchema, validationOptions);
    await next();
  } catch (error) {
    if (error instanceof ValidationError) {
      ctx.body = error;
      ctx.status = 400;      
    } else {
      throw error;
    }
  }
}

exports.validateUser = async (ctx, next) => {

  const validationOptions = {
    throwError: true,
    allowUnknownAttributes: false
  };

  const body = ctx.request.body;

  try {
    v.validate(body, userSchema, validationOptions);
    await next();
  } catch (error) {
    if (error instanceof ValidationError) {
      ctx.body = error;
      ctx.status = 400;      
    } else {
      throw error;
    }
  }
}