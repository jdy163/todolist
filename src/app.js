const express = require("express");
const {
  getAllToDOList,
  getToDOList,
  createToDOList,
  deleteToDOList
} = require("./controller");
const app = express();
app.locals.dataPath = "./data.json";

const port = 4444;

app.use(express.json());
app.get("/", (req, res) => res.send("<h1>This is ToDoList API</h1>"));
//返回所有Todo任务
app.get("/api/tasks", getAllToDOList);
//创建一个新的Todo任务
app.post("/api/tasks", createToDOList);
//返回一个指定
app.get("/api/tasks/:id", getToDOList);
//删除一个指定的Todo任务
app.delete("/api/tasks/:id", deleteToDOList);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

exports.app = app;
