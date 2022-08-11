const express = require("express")
const app = express()
const {Router} = express
const handlebars = require('express-handlebars')
const PORT = 4000

const productos = []


app.set('view engine', 'pug')
app.set('views', './views/layout')

app.use(express.static('public'))

const routerProductos = Router()

routerProductos.get('/', (req, res) => {
    res.render('index.pug', {listExist: true, list: productos })
})

routerProductos.post("/", (req, res) => {
    console.log(req.body)
    const {nombre, price, descripcion} = req.body

    productos.push({
        nombre,
        price,
        descripcion
    })
    console.log(productos)
    res.render('index.pug',{
        productos
    })

})

app.use("/productos", routerProductos)


app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
}) 


