//Conexión a base de datos
const { response } = require("express");
const sql = require("./db");

//Constructor de clase
const Usuario = function(Usuario){
    this.Id = Usuario.Id;
    this.Email = Usuario.Email;
    this.Clave = Usuario.Clave;
}

Usuario.get = result => {
    sql.query(`SELECT * from Usuario;`,(err,res)=>{
        if(err){
            console.log("[-]Error obteniendo la tabla 'Usuario' : ",err);
            result(null,err);
        }else{
            console.log("[^] Lista Usuarios enviada");
            res = res.map( x => {
                x.Comunas = x.Comunas ? JSON.parse(x.Comunas) : []
                return x
            } )
            result(null,res);
        }
    })
}

Usuario.getFromId = (id,result) => {
    sql.query(`SELECT * FROM Usuario WHERE Id = ${id}`, (err,res)=>{
        if(err){
            console.log(`[-]Error obteniendo el Usuario con Id = ${id} : `,err);
            result(null,err);
        }else{
            console.log(`[^]Respuesta Id ${id}: `,res);
            result(null,res);
        }
    })
}

Usuario.getFromEmail = (id,result) => {
    sql.query(`SELECT * FROM Usuario WHERE Email = "${id}"`, (err,res)=>{
        if(err){
            console.log(`[-]Error obteniendo el Usuario con Id = ${id} : `,err);
            result(null,err);
        }else{
            console.log(`[^]Respuesta Id ${id}: `,res);
            result(null,res);
        }
    })
}



Usuario.register = (data,result) => {
    sql.query(`INSERT INTO Usuario (Email,Clave) VALUES ('${data.Email}','${data.Clave}')`,(err,res)=>{
        if(err){
            console.log("[-] Error registrando nuevo usuario: ",err);
            result(null,err);
        }else{
            console.log("[^]Usuario registrado con ID: ",res.insertId);
            result(null,res);
        }
    })
}



module.exports = Usuario;