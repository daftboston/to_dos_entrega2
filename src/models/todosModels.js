// importar db desd utils
const db = require ('../utils/database')

//traer DataTypes, para definir los atributos de la base de datos.

const {DataTypes}= require('sequelize')

const Todos = db.define('todos', {
    id :{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING (30),
        allowNull:false,
    },
    description: {
        type: DataTypes.STRING(400),
        allowNull:false,

    },
    completed:{
        type: DataTypes.BOOLEAN, 
        allowNull:false,       

    }

    

})

module.exports= Todos

