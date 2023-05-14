const request = require("supertest");
const { getApp } = require("../../index");
const app = getApp();
const server = app.listen();

describe("admin user controller", () => {
  beforeAll(async () => {});

  afterAll(async () => {});

  test("server run success", async () => {
    const response = await request(server)
      .get(`/`)
      .set("Content-Type", "application/json");
    expect(response.status).toBe(200);
    // expect(result).toHaveProperty("role", ROLE.MOD);
  });

  test("/joi response success", async () => {
    const response = await request(server)
      .get(`/joi`)
      .set("Content-Type", "application/json")
      .query({ my: "string" });
    expect(response.status).toBe(200);
    const result = response.body;
    expect(result).toHaveProperty("joi", "yes");
  });

  test("/joi response success", async () => {
    const response = await request(server)
      .get(`/joi`)
      .set("Content-Type", "application/json");
    expect(response.status).toBe(400);
    const result = response.body;
    expect(result).toHaveProperty("code", 10005);
    expect(result).toHaveProperty("name", "JOI_VALIDATION_ERROR");
  });
});
