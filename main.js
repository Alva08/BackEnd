
/* class Usuario{
    constructor(nombre, apellido, mascotas, libros) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.mascotas = [];
        this.libros = [];
    }
    
    getFullName(){
      console.log (`Mi nombre es ${this.nombre} ${this.apellido}`)
    }

    addMascota(mascota){
        this.mascotas.push(mascota);
    }

    countMascotas(){
        console.log(this.mascotas.length);
    }

    addBook(libro){
        this.libros.push(libro);
    }

    getBookName(nombre, autor){
        console.log(this.libros.nombre);
    }
}
    
const usuario = new Usuario("Carlos", "Lopez");
usuario.getFullName();
usuario.addMascota("Atila");
usuario.addMascota("Charly");
usuario.countMascotas();
usuario.addBook({"nombre":"hola", "autor":"chau"});
usuario.getBookName();

console.log(usuario); */



/* const fs = require ('fs');



async function leerArchivo(){
    try{
        const contenido = await fs.promises.readFile("./prueba.txt","utf-8")
        console.log(contenido);
    } catch(error){
        console.log(error);
    }
}  

leerArchivo();  
 */




/* 
const productos = [
    { id:1, nombre:'Escuadra', precio:323.45 },
    { id:2, nombre:'Calculadora', precio:234.56 },
    { id:3, nombre:'Globo Terráqueo', precio:45.67 },
    { id:4, nombre:'Paleta Pintura', precio:456.78 },
    { id:5, nombre:'Reloj', precio:67.89 },
    { id:6, nombre:'Agenda', precio:78.90 }
]

function mostrarNombre(producto){
    const nombresProductos = productos.map( (prod) => prod.nombre);
    console.log(nombresProductos);
}

mostrarNombre(); 
mostrarNombre(); 
*/


const fs = require('fs');
const { json } = require('stream/consumers');

class Contenedor{
    constructor(ruta){
        this.ruta = ruta
    }

    async save(obj){
        try{
            let data = await fs.promises.readFile(this.ruta, "utf8");
            let dataParse = JSON.parse(data);
            if(dataParse.length){
                await fs.promises.writeFile(this.ruta, JSON.stringify( [... dataParse, {...obj, id: dataParse.length + 1} ], null, 2 ) )
            }else{
                await fs.promises.writeFile(this.ruta, JSON.stringify( [ {...obj, id: dataParse.length + 1}], null, 2 ) )
            }
            return `El archivo tiene el id:${dataParse.length + 1}`
        }catch(error){
            console.log(error);
        }
    }

}


const contenedor = new Contenedor("./prueba.txt");
contenedor.save({nombre:"carlos", edad:32});

console.log(contenedor);