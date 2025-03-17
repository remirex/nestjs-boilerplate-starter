import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid('local', 'development', 'production', 'test')
    .default('local'),
  PORT: Joi.number().port().default(3000),
  ENABLE_DOCUMENTATION: Joi.boolean().default(true),
  CORS_ORIGIN: Joi.string().required(),
  THROTTLE_TTL: Joi.number().default(60000),
  THROTTLE_LIMIT: Joi.number().default(10),
  MYSQL_TCP_PORT: Joi.number().port().default(3306),
  DB_HOST: Joi.string().required(),
  MYSQL_DATABASE: Joi.string().required(),
  MYSQL_USER: Joi.string().required(),
  MYSQL_PASSWORD: Joi.string().required(),
  //TODO Check this PROFILE_API_KEY: Joi.string().required(),
});
