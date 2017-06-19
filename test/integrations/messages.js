let assert = require('chai').assert
let request = require('supertest-as-promised')

let app = require('../../app')
let db = require("../../app/models")

let userName = "aaaaaa"
let body = "1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111"

describe('messages', () => {

  it('should post message', () => {

    return request(app)
      .post('/api')
      .send({ userName, body })
      .expect(201)
      .then((data) => {
        assert.ok(data);
      });
  });

  it('should return 400 if message body less then 200', () => {
    let body = "123123"

    return request(app)
      .post('/api')
      .send({ userName, body })
      .expect(400)
      .then((data) => {
        assert.ok(data);
      });
  });

  it('should return 400 if userName has invalid symbols', () => {
    let userName = "1@"

    return request(app)
      .post('/api')
      .send({ userName, body })
      .expect(400)
      .then((data) => {
        assert.ok(data);
      });
  });

  it('should return 200 on getting array of messages', () => {

    return request(app)
      .get('/api')
      .expect(200)
      .then((data) => {
        assert.ok(data);
      });
  });

  it('should return 400 if userName has 0 length', () => {
    let userName=""

    return request(app)
      .post('/api')
      .send({userName, body})
      .expect(400)
      .then((data) => {
        assert.ok(data);
      });
  });

});
