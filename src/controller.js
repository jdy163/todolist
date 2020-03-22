const fs = require("fs");
const { asyncReadFile, asyncWriteFile } = require("./dao");

exports.getToDOList = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const file = await asyncReadFile(req.app.locals.dataPath);
  //得到的ID与文件中的类型不一致，使用==
  const todolist = JSON.parse(file).filter(v => v.id == id);
  todolist.length == 0 ? res.status(404).send() : res.send(todolist[0]);
};

exports.getAllToDOList = (req, res) =>
  fs.readFile(req.app.locals.dataPath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send();
    }
    res.send(JSON.parse(data));
  });

exports.createToDOList = async (req, res) => {
  const newToDoList = req.body;
  const file = await asyncReadFile(req.app.locals.dataPath);
  const todolist = JSON.parse(file);
  //判断ID是否已存在
  if (todolist.filter(v => v.id == newToDoList.id).length != 0) {
    //创建失败，返回400
    res.status(400).send();
  } else {
    //创建成功，返回201
    todolist.push(newToDoList);
    await asyncWriteFile(JSON.stringify(todolist), req.app.locals.dataPath);
    res.status(201).send(todolist);
  }
};

exports.deleteToDOList = async (req, res) => {
  const id = req.params.id;
  const file = await asyncReadFile(req.app.locals.dataPath);
  const todolist = JSON.parse(file);
  const newToDoList = todolist.filter(v => v.id != id);
  if (newToDoList.length === todolist.length) {
    //得到的记录不存在，删除失败
    res.status(404).send();
  } else {
    //删除记录，返回204
    await asyncWriteFile(JSON.stringify(newToDoList), req.app.locals.dataPath);
    res.status(204).send();
  }
};
