const app = require("./index");
//const mongoose = require("mongoose")
const request = require("supertest");
//const express = require("express");
//const app = express();



/* afterEach((done) => {
	mongoose.connection.db.dropDatabase(() => {
		mongoose.connection.close(() => done())
	})
}) */

describe('Post Endpoints', () => {
  it('should create a new post', async () => {
    const data = {
		"username": "Surya123456",
		"password": "Suriya123",
        "color": "#234567"
	}
    const res = await request(app)
      .post('/api/login')
      .send(data)
    expect(res.statusCode).toEqual(200)
    console.log(res.body)
    console.log(res.statusCode)
  })
})

afterAll(done => {
  // Closing the DB connection allows Jest to exit successfully.
  app.close()
  done()
})


