const { app } = require("../src/app");
const request = require("supertest");

describe("app", () => {
  describe("get request", () => {
    app.locals.dataPath = "./test/test.json";
    it("得到所有todolist", done => {
      request(app)
        .get("/api/tasks")
        .expect(200)
        .expect([
          {
            id: 1,
            content: "Restful API homework",
            createdTime: "2019-05-15T00:00:00Z"
          }
        ])
        .end((err, res) => {
          if (err) throw err;
          done();
        });
    });

    it("得到特定的todolist", done => {
      request(app)
        .get("/api/tasks/1")
        .expect(200)
        .expect({
          id: 1,
          content: "Restful API homework",
          createdTime: "2019-05-15T00:00:00Z"
        })
        .end((err, res) => {
          if (err) throw err;
          done();
        });
    });
  });

  it("创建id不存在的todolist", done => {
    request(app)
      .post("/api/tasks")
      .send({
        id: 2,
        content: "new homework",
        createdTime: "2020-03-20T00:00:00Z"
      })
      .expect(201)
      .expect([
        {
          id: 1,
          content: "Restful API homework",
          createdTime: "2019-05-15T00:00:00Z"
        },
        {
          id: 2,
          content: "new homework",
          createdTime: "2020-03-20T00:00:00Z"
        }
      ])
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });

  it("创建id已存在的todolist", done => {
    request(app)
      .post("/api/tasks")
      .send({
        id: 2,
        content: "new homework",
        createdTime: "2020-03-20T00:00:00Z"
      })
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });

  it("删除一个存在的todolist", done => {
    request(app)
      .delete("/api/tasks/2")
      .expect(204)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });
});
