
//  ---------------------------------------------------------------- SERVIDOR HTTP ------------------------------------------------------------------------
/*

const http = require ("http");

const server = http.createServer( (req, res)=>{
    const hora = new Date().getHours();
    if(hora >= 6 && hora <= 12){
        res.end("Buenos dias");
    } else if(hora >= 13 && hora <= 19){
        res.end("Buenas tardes");
    }else if(hora >= 20 && hora <= 5)
        res.end("Buenas noches");   
})


const createServer = server.listen(8000, ()=>{
    console.log(`escuchando ${server.address().port}`)
}) 

*/

// --------------------------------------------------------------- SERVIDOR CON EXPRESS -------------------------------------------------------------------




/* 

const express = require ("express");
const {Contenedor} = require("./contenedor.js")

const app = express();

app.get("/", (req, res)=>{
    res.send(`<h1>Bienvenido al servidor express</h1>`);
}) 

app.get("/productos", async (req, res)=>{
    try{
        const contenedor = new Contenedor("./productos.txt");
        const productos = await contenedor.getAll();
        res.json({
            productos
        })
    }catch (error) {
        res.send({status: 500, error})
    }

}) 

app.get("/productoRandom", async (req, res)=>{
    try{

        const contenedor = new Contenedor("./productos.txt");
        const productos = await contenedor.getAll();
        const producto = await contenedor.getById(Math.floor(Math.random()*productos.length));

        res.send({
            producto
        })
    }catch(error) {
        console.log(error);
    }
    
}) 



const PORT = process.env.PORT || 8000
const server = app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${server.address().port}`)
}) 

*/

 


// ----------------------------------------------------------- EXPRESS + RUTEO ---------------------------------------------------------------------



/*
const express = require ("express");
const {Router} = express;
const {Contenedor} = require("./contenedor.js")

const app = express();

app.use(express.static("public"))
app.use(express.json());

const routerProductos = Router();

routerProductos.get("/", async (req, res)=>{
    try{
        const contenedor = new Contenedor("./productos.txt");
        const productos = await contenedor.getAll();
        res.json({
            productos
        })
    }catch (error) {
        res.send({status: 500, error})
    }

})

routerProductos.get("/:id", async (req, res) => {
        
    try{ 
        const { id } = req.params
        const contenedor = new Contenedor("./productos.txt");
        const productos = await contenedor.getAll();
        const producto = await productos.getById(id);

        res.send({
            producto
        })

    }catch (error) {
        res.send({status: 500, error})
    }

})

routerProductos.post("/", (req, res) => {

    try{ 
        const objProducto = req.body
        const contenedor = new Contenedor("./productos.txt");
        contenedor.save(objProducto);

        res.json({
            msj: "producto guardado",
            objProducto
        })

    }catch (error) {
        res.send({status: 500, error})
    }
}) 

routerProductos.put("/:id", async (req, res) => {

    try{ 
        const {id} = req.params
        const objProducto = req.body
        const contenedor = new Contenedor("./productos.txt");
        await contenedor.saveById({id: parseInt(id), ...objProducto});
        const respuesta = 

        res.json({
            respuesta
        })

    }catch (error) {
        res.send({status: 500, error})
    }

})

app.use("/productos", routerProductos);



const PORT = process.env.PORT || 8000
const server = app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${server.address().port}`)
}) 
*/
 


/*
{id:1, nombre:"Plomada", precio:100},
{id:2, nombre:"Roldana", precio:100},
{id:3, nombre:"Tensor", precio:100},
{id:4, nombre:"Rastrillo", precio:100} 

Math.floor(Math.random()*productos.length)
*/


// ----------------------------------------------------- HANDLESBAR, PUG Y EJS -----------------------------------------------------------------------------------



/* const express = require("express")
const app = express()
const {Router} = express
const handlebars = require('express-handlebars')
const PORT = 4000

const productos = []

app.engine(
    'hbs', 
    handlebars.engine({
        extname: '.hbs',
        defaultLayout: 'formulario.hbs',
        layoutsDir: __dirname + '/views/layout',
        partialsDir: __dirname + '/views'
    })
)


app.set('view engine', 'hbs')
app.set('views', './views/layout')

app.use(express.static('public'))

const routerFormulario = Router();
const routerProductos = Router()

routerFormulario.get('/', (req, res) => {
    res.render('formulario.hbs',)
})

routerFormulario.post("/", (req, res) => {
    console.log(req.body)
    const {nombre, price, descripcion} = req.body
    productos.push({
        nombre,
        price,
        descripcion
    })
    console.log(productos)
    res.render('formulario.hbs',{
        productos
    })

}) 

app.use("/", routerFormulario)






app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
}) 
*/


// ----------------------------------------------------------- primera entrega proyecto final ----------------------------------------------------------------------


/* 
const express = require("express");
const {Router} = express;
const app = express();

app.use(express.json());
app.use(express.static("public"));

const productos = [{
    "id": 1,
    "nombre": "plomada",
    "precio": 100
},
{
    "id": 2,
    "nombre": "rastrillo",
    "precio": 200
},
{
    "id": 3,
    "nombre": "tensor",
    "precio": 300
}
];

const carrito = [];


const routerProducts = Router();
const routerCarrito =  Router();




routerProducts.get('/', (req, res) => {
    res.json({
        productos
    })
})



routerProducts.get("/:id", (res, req) => {
    const producto = productos.find( p => p.id === req.params.id)
    if(!producto){
        return res.statusCode(404).send("El producto no ha sido encontrado");
    }else{
        res.json(
            producto
        )
    }
})

routerProducts.post("/", (req,res) => {
    const newProducto = {
        id: productos.length + 1,
        nombre: req.body.nombre,
        precio: parseInt(req.body.precio)
    }

    productos.push(newProducto)

    res.send({
        productos
    })

})

routerProducts.delete("/:id",(req, res) => {
    const producto = productos.find( p => p.id === req.params.id)
    if(!producto){
        return res.status(404).send("El producto no ha sido encontrado");
    }else{
        const index = productos.indexOf(producto)
        producto.splice(index, 1)
        res.send(producto)
    }
})

app.use("/api/productos", routerProducts);




routerCarrito.post("/:id", (req, res) => {
    const producto = productos.find( p => p.id === req.params.id)
    if(!producto){
        return res.statusCode(404).send("El producto no ha sido encontrado");
    }else{
        carrito.push(producto)
    }
})

routerCarrito.delete("/", (req, res) => {
    for (let i = carrito.length; i > 0; i--) {
        carrito.pop();
    }
})

routerCarrito.get('/', (req, res) => {
    res.json({
        carrito
    })
})

routerCarrito.delete("/:id", (req, res) => {
    const producto = carrito.find( p => p.id === req.params.id)
    if(!producto){
        return res.status(404).send("El producto no ha sido encontrado");
    }else{
        const index = carrito.indexOf(producto)
        producto.splice(index, 1)
    }
})

app.use("/api/carrito", routerCarrito);



const server = app.listen(4000, () => {
    console.log(`Escuchando en el puerto ${server.address().port}`)
}) 

*/


// ------------------------------------- sql -----------------------------------------------------------------------------------------------------


//const { options } = require("./mariaDB/conexion")
const { options } = require("./sqlite3/sqlite")

const knex = require('knex')(options)

const {Contenedor} = require("./contenedor.js")


const contenedor = new Contenedor(options); 
contenedor.crearTabla("Alvaro");
//contenedor.agregarProductos("Alvaro");
//contenedor.modificarProducto("alvaro","tensor",300);
//contenedor.borrarProducto("alvaro",1);




