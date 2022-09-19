import supertest from "supertest";
import app from "../src/app";
import userFactory from "../factories/userFactory";

export async function testSignUp() {
  const APP = supertest(app);

  describe("Tests POST /signup", () => {
    it("When you sign up a valid user, it should return status code 200", async () => {
      const user = await userFactory();
      const result = await APP.post("/signup").send(user);
      expect(result.status).toBe(201);
    });
    it("When you sign up an email that is already in use and a different password, it should return status code 409", async () => {
      const user = await userFactory();
      await APP.post("/signup").send(user);
      const result = await APP.post("/signup").send({email: user.email, password: "123456789", confirmPassword: "123456789"});
      expect(result.status).toBe(409)
    })
    it("When you sign up an email that is already in use and the same password, it should return status code 409", async () => {
      const user = await userFactory();
      await APP.post("/signup").send(user);
      const result = await APP.post("/signup").send(user);
      expect(result.status).toBe(409)
    })
    it("When you sign up and forget the any part of the schema, it should return status code 422", async () => {
      const result = await APP.post("/signup").send({email: "something"});
      expect(result.status).toBe(422)
    })
    it("When you sign up and forget the any part of the schema, it should return status code 422", async () => {
      const result = await APP.post("/signup").send({password: "something"});
      expect(result.status).toBe(422)
    })
    it("When you sign up and forget the any part of the schema, it should return status code 422", async () => {
      const result = await APP.post("/signup").send({confirmPassword: "something"});
      expect(result.status).toBe(422)
    })
    it("When you sign up and forget the any part of the schema, it should return status code 422", async () => {
      const result = await APP.post("/signup").send({anything: "something"});
      expect(result.status).toBe(422)
    })
  });
}
