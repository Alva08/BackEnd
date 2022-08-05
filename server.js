
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
 


/*

{id:1, nombre:"Plomada", precio:100},
{id:2, nombre:"Roldana", precio:100},
{id:3, nombre:"Tensor", precio:100},
{id:4, nombre:"Rastrillo", precio:100} 

Math.floor(Math.random()*productos.length)

*/









