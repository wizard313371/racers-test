const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const { Driver } = require("../models/driverModel");
const app = require("../server");

let mongoServer;

beforeAll(async () => {
  process.env.PORT = 0;
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Driver Controller", () => {
  beforeEach(async () => {
    await Driver.deleteMany({});
  });

  test("should create a new driver", async () => {
    const res = await request(app)
      .post("/drivers")
      .send({
        givenName: "John",
        familyName: "Doe",
        url: "http://example.com",
        dateOfBirth: "1990-01-01",
        nationality: "American"
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.givenName).toEqual("John");
  });

  test("should retrieve a list of drivers", async () => {
    await Driver.create([
      {
        givenName: "John",
        familyName: "Doe",
        url: "http://example.com",
        dateOfBirth: "1990-01-01",
        nationality: "American"
      },
      {
        givenName: "Jane",
        familyName: "Doe",
        url: "http://example.com",
        dateOfBirth: "1991-01-01",
        nationality: "American"
      }
    ]);

    const res = await request(app).get("/drivers");
    expect(res.statusCode).toEqual(200);
    expect(res.body.drivers).toHaveLength(2);  // Проверьте, что возвращается два водителя
  });

  test("should retrieve a single driver", async () => {
    const driver = await Driver.create({
      givenName: "John",
      familyName: "Doe",
      url: "http://example.com",
      dateOfBirth: "1990-01-01",
      nationality: "American"
    });

    const res = await request(app).get(`/drivers/${driver._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.givenName).toEqual("John");
    expect(res.body.familyName).toEqual("Doe");
    expect(res.body.url).toEqual("http://example.com");
    expect(res.body.dateOfBirth).toEqual("1990-01-01T00:00:00.000Z");
    expect(res.body.nationality).toEqual("American");
  });

  test("should update a driver", async () => {
    const driver = await Driver.create({
      givenName: "John",
      familyName: "Doe",
      url: "http://example.com",
      dateOfBirth: "1990-01-01",
      nationality: "American"
    });

    const res = await request(app)
      .put(`/drivers/${driver._id}`)
      .send({
        givenName: "Jane",
        familyName: "Doe",
        url: "http://example.com",
        dateOfBirth: "1990-01-01",
        nationality: "American"
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.givenName).toEqual("Jane");
  });


  test("should delete a driver", async () => {
    const driver = await Driver.create({
      givenName: "John",
      familyName: "Doe",
      url: "http://example.com",
      dateOfBirth: "1990-01-01",
      nationality: "American"
    });

    const res = await request(app).delete(`/drivers/${driver._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.givenName).toEqual("John");

    const foundDriver = await Driver.findById(driver._id);
    expect(foundDriver).toBeNull();
  });
});
