const express = require('express');
const mongoose = require('mongoose');
const routers = require('./routers/index');

const CFG = require('./utils/config'); //конфиг
const { PORT = CFG.PORT, MONGO_URL = CFG.MONGO_URL } = process.env; //получаем константы для подключения mongoDB
const app = express();

mongoose.connect(MONGO_URL,  //коннектимся к БД
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
  
  mongoose.connection.on('open', () => console.log('connected to mongoDB')); //выводим в консоль сообщение, если коннект успешен 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', routers);

app.listen(PORT, () => {
    console.log(`Application is running on port ${PORT}`)
})