import supertest from "supertest";
import app from "../src/app";
import userFactory from "../factories/userFactory";

export async function testSignIn() {
  const APP = supertest(app);

  describe("Tests POST /signin", () => {
    it("When you sign in a valid user, it should return status code 201 and a object that has your token", async () => {
      const user = await userFactory();
      await APP.post("/signup").send(user);
      const result = await APP.post("/signin").send({email: user.email, password: user.password});
      expect(result.status).toBe(200);
      expect(result.body).toBeInstanceOf(Object)
    });
    it("When you sign in a invalid user, it should return status code 401", async () => {
        const user = await userFactory();
        await APP.post("/signup").send(user);
        const result = await APP.post("/signin").send({email: user.email, password: "123123"});
        expect(result.status).toBe(401);
      });
      it("When you sign in a invalid user, it should return status code 422", async () => {
        const user = await userFactory();
        await APP.post("/signup").send(user);
        const result = await APP.post("/signin").send({email: user.email});
        expect(result.status).toBe(422);
      });
      it("When you sign in a invalid user, it should return status code 422", async () => {
        const user = await userFactory();
        await APP.post("/signup").send(user);
        const result = await APP.post("/signin").send({password: user.password});
        expect(result.status).toBe(422);
      });
  });
}
