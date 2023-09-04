require('dotenv').config();

const JWT_SECRET_DEV = '48939506643b0980300a1ce0e0704247';
const PORT = process.env.PORT || 3000;
const MONGO_DB = process.env.MONGO_DB || 'mongodb://127.0.0.1:27017/bitfilmsdb';

module.exports = {
  JWT_SECRET_DEV,
  PORT,
  MONGO_DB,
};
