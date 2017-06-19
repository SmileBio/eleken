const Joi = require('joi')


module.exports.create = function createMessage(req, res, next) {
  let schema = Joi.object().keys({
    userName: Joi.string().regex(/^[a-zA-Z0-9]+$/g).required().description('user name'),
    body: Joi.string().min(200).max(65535).required().description('message body')
  })

  let body = Joi.validate(req.body, schema, (err, value)=>{
    return err ? err.details[0] : false
  })

  let query = Joi.validate(req.body, schema, (err, value)=>{
    return err ? err.details[0] : false
  })

  let error = whereError(body, query)
  error ? res.status(400).json(error) : next()
}

module.exports.getMessages = function getMessages(req, res, next) {
  let schema = Joi.object().keys({
    page: Joi.number().default(1).description("page number"),
    limit: Joi.number().default(20).description("how many posts per page")
  })

  let body = Joi.validate(req.body, schema, (err, value)=>{
    return err ? err.details[0] : false
  })

  let query = Joi.validate(req.body, schema, (err, value)=>{
    return err ? err.details[0] : false
  })

  let error = whereError(body, query)
  error ? res.status(400).json(error) : next()
}


function whereError(body, query, params){
  if (body) {
    body.where = "body params"
    return body
  }else if (query){
    query.where = "query params"
    return query
  }else {
    return false
  }
}
