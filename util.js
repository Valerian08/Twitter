const Joi = require('joi');

exports.validateRegister = (reg) =>{
    const registerschema = Joi.object().keys({
        firstname: Joi.string().alphanum().min(3).max(30).required(),
        lastname: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email({ minDomainSegments: 2 }),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
      });
   const validation = registerschema.validate(reg);
   return validation;
}

exports.validatePost = (p) =>{
  const postschema = Joi.object().keys({
      post: Joi.string().allow('').min(1).max(1000)
    });
   const validation = postschema.validate(p);
   return validation;
}



