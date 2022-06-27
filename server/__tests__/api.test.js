const supertest = require('supertest');
const app = require('../app');
const db = require('../app/models/index');

describe("tutorials APIs",() => {
  let thisDb = db;

  beforeAll(async () =>{
    await thisDb.sequelize.sync({force:true});
  });

  describe("tutorials enpoint", () => {
    const apiEndPoint = "/api/tutorials";
    test("it should get tutorial items", async()=> {
      const response = await supertest(app).get(apiEndPoint).expect(200);
      return response;
    });

    test("it will send error when not sending data to post", async()=> {
      const response = await supertest(app).post(apiEndPoint).expect(400);
      return response;
    });

    test("it should create new tutorials", async () => {
      const data = {
        title: "Unit test create",
        describe: "unit test creating tutorial",
        published: true,
      };
      const response = await supertest(app)
        .post(apiEndPoint)
        .send(data)
        .expect(200)
      expect(JSON.parse(response.text).title) == "Unit test create";
      return response;
    });

    describe("Getting tutorials by ID", ()=> {
      test("It should fail when updating record that does not exist", async () => {
        const id = 1;
        const response = await supertest(app)
        .put(`${apiEndPoint}/${id}`)
        expect(JSON.parse(response.text).message).toBe(`Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`);
        return response;
      });

      test("It should update existing tutorial", async() => {
        const id = 1;
        const data = {
          title: "Unit test create",
          describe: "unit test creating tutorial",
          published: true,
        };
        const response = await supertest(app)
          .post(apiEndPoint)
          .send(data)

        const updated = {
          ...data,
          ...{title: "updated test create"}
        }
          
        const updatedresponse = await supertest(app)
          .put(`${apiEndPoint}/${id}`)
          .send(updated)
        expect(JSON.parse(updatedresponse.text).message).toBe("Tutorial was updated successfully.");      
      });
    })

    describe("Deleting tutorials", () => {
      test("It should delete tutorial by ID", async ()=> {
        const response = await supertest(app)
        .delete(`${apiEndPoint}/1`)
        .expect(200)
        expect(JSON.parse(response.text).message).toBe("Tutorial was deleted successfully!");
        return response;
      });
  
      test("It should return error message when tutorial does not exist", async ()=> {
        const response = await supertest(app)
        .delete(`${apiEndPoint}/22`)
        expect(JSON.parse(response.text).message).toBe("Cannot delete Tutorial with id=22. Maybe Tutorial was not found!");
        return response;
      })
    });

  });

  describe("publish endpoint", () =>{
    test("it should get published tutorials", async()=> {
      const response = await supertest(app).get("/api/tutorials/published").expect(200);
      return response;
    });
  });

  afterAll(async () => {
    await thisDb.sequelize.close()
  });
});
