
//   SERVIDOR HTTP
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

//  SERVIDOR CON EXPRESS


const express = require ("express");
const app = express();
const PORT = 8080
let productos = [
    {id:1, nombre:"Plomada", precio:100},
    {id:2, nombre:"Roldana", precio:100},
    {id:3, nombre:"Tensor", precio:100},
    {id:4, nombre:"Rastrillo", precio:100}
];

const server = app.listen(PORT, ()=>{
    console.log(`escuchando puerto: ${PORT}`)
}) 

server.on("error", (error) => {
    console.log(`error del servidor ${error}`)
})

app.get("/", (req, res)=>{
    res.send(`<h1>Bienvenido al servidor express</h1>`);
}) 

app.get("/productos", (req, res)=>{
    res.send(productos)
}) 

app.get("/productoRandom", (req, res)=>{
    const aleatorio = productos[Math.floor(Math.random()*productos.length)]
    res.send(aleatorio)
})





