class Persona {
    "nombre"
    "numero"
    "turnos"
    constructor(nombre, numero, turnos) {
        this.nombre = nombre,
        this.numero = numero,
        this.turnos = turnos
    }
}

let User = new Persona("Juan", "03658721", ["cube", "rampa"])

document.getElementById("nombre").innerHTML = User.nombre
document.getElementById("numero").innerHTML = User.numero
document.getElementById("turno").innerHTML = User.turnos