import supertest from "supertest";
import app from "./../src/app.js";
import userFactory from "../factories/userFactory.js";

export async function testSignIn() {
  const APP = supertest(app);

  describe("Tests POST /signup", () => {
    it("When you sign up a valid user, it should return status code 201", async () => {
      const user = await userFactory();
      const result = await APP.post("/signup").send(user);
      expect(result.status).toBe(201);
    });
    it.todo("When you sign up an email that is already in use, it should return status code 409")
  });
}
