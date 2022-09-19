import supertest from "supertest";
import app from "../src/app";
import userFactory from "../factories/userFactory";

export async function testSignIn() {
  const APP = supertest(app);

  describe("Tests POST /signin", () => {
    it("Should return status code 200 and a object that has your token", async () => {
      const user = await userFactory();
      await APP.post("/signup").send(user);
      const result = await APP.post("/signin").send({
        email: user.email,
        password: user.password,
      });
      expect(result.status).toBe(200);
      expect(result.body).toBeInstanceOf(Object);
      return;
    });
    it("Should return status code 401 in case the password doesn't match", async () => {
      const user = await userFactory();
      await APP.post("/signup").send(user);
      const result = await APP.post("/signin").send({
        email: user.email,
        password: "123123",
      });
      expect(result.status).toBe(401);
    });
    it("Should return status code 401 in case the email doesn't exist", async () => {
      const user = await userFactory();
      await APP.post("/signup").send(user);
      const result = await APP.post("/signin").send({
        email: "testemail2321232123@gmail.com",
        password: user.password,
      });
      expect(result.status).toBe(401);
    });
    it("Should return status code 422 if there isn't a password", async () => {
      const user = await userFactory();
      await APP.post("/signup").send(user);
      const result = await APP.post("/signin").send({ email: user.email });
      expect(result.status).toBe(422);
    });
    it("Should return status code 422 if there isn't an email", async () => {
      const user = await userFactory();
      await APP.post("/signup").send(user);
      const result = await APP.post("/signin").send({
        password: user.password,
      });
      expect(result.status).toBe(422);
    });
  });
  return;
}
