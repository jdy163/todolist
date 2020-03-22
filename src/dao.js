const fs = require("fs");
//异步读文件
exports.asyncReadFile = path => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", function(err, data) {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  }).catch(err => {
    return err;
  });
};
//异步写文件
exports.asyncWriteFile = (string, path) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, string, err => {
      reject(err);
    });
  }).catch(err => {
    return err;
  });
};
