import supertest from "supertest";
import app from "../src/app";
import userFactory from "../factories/userFactory";

export async function testSignUp() {
  const APP = supertest(app);

  describe("Tests POST /signup", () => {
    it("Should return status code 200 if success", async () => {
      const user = await userFactory();
      const result = await APP.post("/signup").send(user);
      expect(result.status).toBe(201);
    });
    it("Should return status code 409 if the email is already in use", async () => {
      const user = await userFactory();
      await APP.post("/signup").send(user);
      const result = await APP.post("/signup").send({email: user.email, password: "123456789", confirmPassword: "123456789"});
      expect(result.status).toBe(409)
    })
    it("Should return status code 409 if the user send the same data twice", async () => {
      const user = await userFactory();
      await APP.post("/signup").send(user);
      const result = await APP.post("/signup").send(user);
      expect(result.status).toBe(409)
    })
    it("Should return status code 422 if the user forget about any part of the schema", async () => {
      const result = await APP.post("/signup").send({email: "something"});
      expect(result.status).toBe(422)
    })
    it("Should return status code 422 if the user forget about any part of the schema", async () => {
      const result = await APP.post("/signup").send({password: "something"});
      expect(result.status).toBe(422)
    })
    it("Should return status code 422 if the user forget about any part of the schema", async () => {
      const result = await APP.post("/signup").send({confirmPassword: "something"});
      expect(result.status).toBe(422)
    })
    it("Should return status code 422 if the user forget about any part of the schema", async () => {
      const result = await APP.post("/signup").send({anything: "something"});
      expect(result.status).toBe(422)
    })
  });
}
