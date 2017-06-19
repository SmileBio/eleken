let express = require('express'),
    router = express.Router(),
    db = require('../models'),
    messageValidations = require('../services/messageValidations'),
    Messages = require('../services/messages')

let message = new Messages(db.message)

module.exports = function (app) {
    app.use('/api', router);
}

/*
get all messages
*/
router.get("/", messageValidations.getMessages, (req, res, next)=>{
  message.findAllMessages(req.query).then(messages=>{
    messages != null ?  res.status(200).json(messages) : res.json({error: "nothing to show"})
  }).catch(next)
})

/*
create new message
*/
router.post("/", messageValidations.create, (req, res, next)=>{
  message.createMessage(req.body).then(message=>{
    res.status(201).send({message: "success"})
  }).catch(next)
})
