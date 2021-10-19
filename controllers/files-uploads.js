/* 
        Данный мудуль полная лажа!!!
Его необходимо переписать в более вменяемом стиле:
1. убрать повторы кода (вынести в отдельные функции)
2. рассмотреть возможность убрать вложенные if
3. нормально переписать отлов ошибок и отправлять правильные коды res.status 
4. обязательно сделать переименование с кирилицы на латиницу!!! Иначе имена файлов нечитаемы (или вообще давать им сгенерированные имена)
5. добавить проверку на mimetype, чтобы грузились только картинки
*/

const fs = require("fs");
const path = require("path");
const { ConflictErr, BadRequestErr } = require("../errors/index");
const { ERR_MSG } = require("../utils/constants");
const dirPath = path.join(__dirname, "../uploads/images/");
let uploadPath;

const readFilesInDir = (req, res, next) => {
  //читаем все файлы в папке
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      throw new BadRequestErr(ERR_MSG.BAD_REQUEST);
    }
    res.send(files);
  });
};

const uploadFiles = (req, res, next) => {
  // Загружаем если файлов много
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send("Нечего загружать.");
    return;
  }
  if (Array.isArray(req.files.productPhoto)) {
    let data;
    const img = req.files.productPhoto.map((element) => {
      uploadPath = dirPath + element.name;
      element.mv(uploadPath).catch((err) => {
        return res.status(500).send("Ошибка копирования файла" + err);
      });
      data = {
        name: element.name,
        mimetype: element.mimetype,
        size: element.size,
        path: uploadPath,
      };
      console.log(data);
      return data;
    });
    res.send(img);
  }

  if (!Array.isArray(req.files.productPhoto)) {
    // Загружаем если файл один
    uploadPath = path.join(__dirname, "../uploads/images/" + req.files.productPhoto.name);
    let data = [];
    fs.access(uploadPath, fs.F_OK, (err) => {
      if (err) {
        req.files.productPhoto.mv(uploadPath).catch((err) => {
          return res.status(500).send("Ошибка копирования файла" + err);
        });
        data.push({
          name: req.files.productPhoto.name,
          mimetype: req.files.productPhoto.mimetype,
          size: req.files.productPhoto.size,
          path: uploadPath,
        });
      } else {
       // throw new ConflictErr(ERR_MSG.FILE_CONFLICT);
        return res.status(409).send(ERR_MSG.FILE_CONFLICT + req.files.productPhoto.name);
      }
      res.status(201).send(data);
    });
  }
};

const deleteFile = (req, res, next) => { //удаляем один файл по имени
  const { imageFile } = req.body;
  fs.unlink(dirPath + imageFile, (err) => {
    if (err) {
      return res.status(500).send("Ошибка удаления файла " + err);
    } else {
      res.status(201).send("Файл успешно удалён");
    }
  });
};
module.exports = {
  readFilesInDir,
  uploadFiles,
  deleteFile,
};
