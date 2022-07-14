
class Usuario{
    constructor(nombre, apellido, libros) {
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
    const count = this.mascotas.map(item => item.amount).reduce((prev, curr) => prev + curr, 0);
    return count;
    }

    addBook(libro){
        this.libros.push(libro);
    }

    getBookName(){
        const nombresLibros = this.libros.nombre;
        return nombresLibros;
    }
}
    
const usuario = new Usuario("Carlos", "Lopez");
usuario.getFullName()
usuario.addMascota("Atila");
usuario.addMascota("Charly");
usuario.addBook({"nombre":"hola", "autor":"chau"});
usuario.getBookName();

console.log(usuario);











