const dbConfig = require("../config/db.config.js");
const Sequelize  = require('sequelize')
const Chatmessages  = require('./chat.model')



const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  });

 const { Chat, Message, Image } = Chatmessages(sequelize, Sequelize)
 
const db = {
  Sequelize,
  sequelize,
  chat: Chat,
  message: Message,
  image: Image,
};
module.exports = {
  Chat, Message, Image, db
 }
