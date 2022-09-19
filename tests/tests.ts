import supertest from "supertest";
import testFactory from "../factories/testFactory";
import userFactory from "../factories/userFactory";
import app from "../src/app";

export async function testTests() {
  const APP = supertest(app);

  describe("Tests POST /tests", () => {
    it("Should return status code 201 when a valid test request is provided", async () => {
      const user = await userFactory();
      await APP.post("/signup").send(user);
      const { body } = await APP.post("/signin").send({
        email: user.email,
        password: user.password,
      });
      const { token } = body;
      const authHeader = { Authorization: "" };
      authHeader.Authorization = `${token}`;
      const test = await testFactory();
      const result = await APP.post("/tests").set(authHeader).send({
        name: test.name,
        pdfUrl: test.pdfUrl,
        categoryId: 1,
        teacherDisciplineId: 2,
      });
      expect(result.status).toBe(201);
    });

    it("Should return status code 422 if pdfUrl is invalid", async () => {
      const user = await userFactory();
      await APP.post("/signup").send(user);
      const { body } = await APP.post("/signin").send({
        email: user.email,
        password: user.password,
      });
      const { token } = body;
      const authHeader = { Authorization: "" };
      authHeader.Authorization = `${token}`;
      const test = await testFactory();
      const response = await APP.post("/tests").set(authHeader).send({
        name: test.name,
        pdfUrl: "1111111",
        categoryId: 1,
        teacherDisciplineId: 2,
      });
      expect(response.statusCode).toBe(422);
    });

    it("Should return status code 404 if teacherDisciplineId is invalid", async () => {
      const user = await userFactory();
      await APP.post("/signup").send(user);
      const { body } = await APP.post("/signin").send({
        email: user.email,
        password: user.password,
      });
      const { token } = body;
      const authHeader = { Authorization: "" };
      authHeader.Authorization = `${token}`;
      const test = await testFactory();
      const response = await APP.post("/tests").set(authHeader).send({
        name: test.name,
        pdfUrl: test.pdfUrl,
        categoryId: 1,
        teacherDisciplineId: 2222222222,
      });
      expect(response.statusCode).toBe(404);
    });

    it("Should return status code 404 if categoryId is invalid", async () => {
      const user = await userFactory();
      await APP.post("/signup").send(user);
      const { body } = await APP.post("/signin").send({
        email: user.email,
        password: user.password,
      });
      const { token } = body;
      const authHeader = { Authorization: "" };
      authHeader.Authorization = `${token}`;
      const test = await testFactory();
      const response = await APP.post("/tests").set(authHeader).send({
        name: test.name,
        pdfUrl: test.pdfUrl,
        categoryId: 1111111111,
        teacherDisciplineId: 2,
      });
      expect(response.statusCode).toBe(404);
    });

    it("Should return status code 201 in success", async () => {
      const user = await userFactory();
      await APP.post("/signup").send(user);
      const { body } = await APP.post("/signin").send({
        email: user.email,
        password: user.password,
      });
      const { token } = body;
      const authHeader = { Authorization: "" };
      authHeader.Authorization = `${token}`;
      const test = await testFactory();
      const response = await APP.post("/tests").set(authHeader).send({
        name: test.name,
        pdfUrl: test.pdfUrl,
        categoryId: 1,
        teacherDisciplineId: 2,
      });
      expect(response.statusCode).toBe(201);
    });
  });

  describe("GET /testsDisciplines", () => {
    it("Should return status code 401 if jwt token header is not present", async () => {
      const response = await APP.get("/testsDisciplines");
      expect(response.statusCode).toBe(401);
    });

    it("Should return status code 200 with terms array in sucess", async () => {
      const user = await userFactory();
      await APP.post("/signup").send(user);
      const { body } = await APP.post("/signin").send({
        email: user.email,
        password: user.password,
      });
      const { token } = body;
      const authHeader = { Authorization: "" };
      authHeader.Authorization = `${token}`;
      const response = await APP.get("/testsDisciplines").set(authHeader);
      expect(response.statusCode).toBe(200);

      const { terms } = response.body;
      expect(terms).toBeInstanceOf(Array);
    });
  });

  describe("GET /testsTeachers", () => {
    it("Should return status code 401 if jwt token header is not present", async () => {
      const response = await APP.get("/testsTeachers");
      expect(response.statusCode).toBe(401);
    });

    it("Should return status code 200 with teachers array in sucess", async () => {
      const user = await userFactory();
      await APP.post("/signup").send(user);
      const { body } = await APP.post("/signin").send({
        email: user.email,
        password: user.password,
      });
      const { token } = body;
      const authHeader = { Authorization: "" };
      authHeader.Authorization = `${token}`;
      const response = await APP.get("/testsTeachers").set(authHeader);
      expect(response.statusCode).toBe(200);

      const { teachers } = response.body;
      expect(teachers).toBeInstanceOf(Array);
    });
  });

  describe("GET /tests/:id", () => {
    it("Should return status code 401 if jwt token header is not present", async () => {
      const response = await APP.get("/tests/1");
      expect(response.statusCode).toBe(401);
    });

//     it("Should return status code 200 with terms array in sucess", async () => {
//       const user = await userFactory();
//       await APP.post("/signup").send(user);
//       const { body } = await APP.post("/signin").send({
//         email: user.email,
//         password: user.password,
//       });
//       const { token } = body;
//       const authHeader = { Authorization: "" };
//       authHeader.Authorization = `${token}`;
//       const test = await testFactory();
//       const teste = await APP.post("/tests").set(authHeader).send(test);
//       console.log(teste.statusCode)
//       const response = await APP.get("/tests/2").set(authHeader);
//       expect(response.statusCode).toBe(200);
//       expect(response.body).toBeInstanceOf(Object);
//     });
   });
}
