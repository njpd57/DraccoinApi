require('dotenv').config();

module.exports = {
   api: {
      port: process.env.API_PORT,
   },
   cors: {
      origin: process.env.CORS_ORIGIN,
   },
   mysql: {
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      database: process.env.MYSQL_DB,
   },
   jwt: {
      secret: process.env.JWT_SECRET,
   },

}                  
