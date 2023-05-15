// importar sequelize

const {Sequelize}= require ('sequelize')

//importar el dotenv para usar las variables de entorno 
require('dotenv').config();

const db = new Sequelize({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD, 
    dialect: 'postgres',
    dialectOptions: {ssl: {require:true, rejectUnauthorized:false}}
    

})

// exportar db
module.exports= db;


