/**
* A module to run JSON Schema based validation on request/response data.
* @module controllers/validation
* @author Jack
* @see schemas/* for JSON Schema definition files
*/

const {Validator, ValidationError} = require('jsonschema');
const dogSchema = require('../schemas/dog.schema.js');
const dogUpdateSchema = require('../schemas/dogsUpdate.schema.js');
const userSchema = require('../schemas/user.schema.js');
const v = new Validator();

/**
* Validate a request body against dogSchema to ensure valid dog entry creation.
*/
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

/**
* Validate a request body against dogUpdateSchema to ensure valid dog entry update.
*/
exports.validateDogUpdate = async (ctx, next) => {

  const validationOptions = {
    throwError: true,
    allowUnknownAttributes: false
  };

  const body = ctx.request.body;

  try {
    v.validate(body, dogUpdateSchema, validationOptions);
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

/**
* Validate a request body against userSchema to ensure valid user creation.
*/
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