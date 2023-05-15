// Instalar controladores  npm init -y   npm i express  
//Instalar  para correr el servidor auto, nodemon -D
// Instalarcontroladores para posgres npm i pg pg-hstore sequelize
// Crear carpeta src y meter carpetas models, utils. en utils crear db
// dentro de src crear archivo app.js
// actualizar scripts star y dev en el archivo package.json. "start": "node ./src/app.js",
 //   "dev": "nodemon ./src/app.js",


//importar express
const express = require ('express')

const Todos=require('./models/todosModels');
const cors = require("cors");
require ('dotenv').config();
const app = express ();
app.use(cors());
app.use(express.json())



//respuesta del servidor
app.get('/', (req, res)=> {
    res.send ('servidor funcionando')
})
//obtener todas las tareas 
app.get ('/todos',async(req, res)=>{
    try{
        const todos = await Todos.findAll();
        res.json(todos);
    } catch(error){
        res.status(400).json(error)

    }
})


//obtener tarea x id
app.get ('/todos/id/:id',async(req, res)=>{
    try{
        // request. paramas trae un objeto que traiga los 
        const {id}= req.params;
        console.log(req.params);

        //sequielize ofrece un metodo find by primary key, 
        const todo = await Todos.findByPk(id)        
        res.json(todo);
    } catch(error){
        res.status(400).json(error)

    }
})

//crear una tarea
app.post('/todos', async (req, res)=>{
    try{
        //Extraemos el cuerpo de la peticion
        const newToDo =req.body;
        //INSERT INTO users VALUES (firstname, lastname, email, password)
        await Todos.create(newToDo)
        res.status(201).send();
    } catch(error){
        res.status(400).json(error);
    }
})

//eliminar una tarea x id

app.delete('/todos/:id', async(req, res)=>{
    try{
        const {id}= req.params;
        await Todos.destroy({
            where:{id},
        });
        res.status(204).send();
    }catch(error){
        res.status(400).json(error) 
    }
})

// actualizar un tarea

app.put('/todos/:id', async(req,res)=>{
    try{
        const {id}=req.params;
        const {title, description}= req.body
        await Todos.update({title, description}, {
            where: {id}
        })
        res.status(204).send();
    }catch(error){
        res.status(400).json(error) 


    }
})


// poner a escuchar el servidor
const PORT = process.env.PORT || 8000;
app. listen (PORT, ()=>{
    console.log(`servidor escuchando en el puerto ${PORT}`);
})

// continuar en database

const db = require ('./utils/database')

// crear una autenticacion de una conexion con el metodo autenticate.

db.authenticate()
.then (()=> console.log('base de datos conectada'))
.catch ((err)=> console.log(err))

//db.sync sincroniza y actualiza la base de datos, si la tabla no esta creada la crea
db.sync()
.then(()=>console.log('base de datos sincronizada'))
.catch(error=> console.log(error))

console.log(process.env);






