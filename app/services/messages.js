
class Messages {
  constructor(messageModel){
    this.messageModel = messageModel
  }

  createMessage(body, params, query){
    return this.messageModel.create(body)
  }

  findAllMessages(query){
    let pageNumber = parseInt(query.page) || 0
    let limit = parseInt(query.limit) || 20
    return this.messageModel.findAll({
      offset: pageNumber*limit,
      limit: limit
    })
  }


}


module.exports = Messages
