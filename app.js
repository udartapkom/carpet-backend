const express = require('express');
const mongoose = require('mongoose');
const routers = require('./routers/index');
const cors = require('cors');
const serveStatic = require('serve-static')
const fileUpload = require('express-fileupload');

const CFG = require('./utils/config'); //конфиг
const { PORT = CFG.PORT, MONGO_URL = CFG.MONGO_URL } = process.env; //получаем константы для подключения mongoDB

const allowedCors = [
  'http://www.myportfolios.ru/',
  'http://myportfolios.ru/',
  'https://www.myportfolios.ru/',
  'https://myportfolios.ru/',
  '*',
];

const app = express();

mongoose.connect(MONGO_URL,  //коннектимся к БД
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
  
  mongoose.connection.on('open', () => console.log('connected to mongoDB')); //выводим в консоль сообщение, если коннект успешен 
  
  app.use((req, res, next) => {
    const { origin } = req.headers;
    if (allowedCors.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
    }
    next();
  });
  app.use(fileUpload({}))
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(serveStatic('uploads/images'))
app.use('/', routers);

app.listen(PORT, () => {
    console.log(`Application is running on port ${PORT}`)
})