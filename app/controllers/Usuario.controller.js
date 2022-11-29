const Usuario = require("../models/Usuario.model");
const bcrypt = require( 'bcryptjs') ;
const moment = require('moment');
const jwt = require("jwt-simple");
const { response } = require("express");

exports.get = (req,res)=>{
    Usuario.get((err,data) =>{
        if(err){
            res.status(500).send({
                message:
                    err.message || "Error al Obtener Datos de Usuario"
            })
        }else{
            res.send(data);
        }
    })
};

exports.getFromId = (req,res) =>{
    Usuario.getFromId(req.params.id,(err,data) => {
        if(err){
            res.status(500).send({
                message:
                    err.message || `Error al Obtener Id ${req.params.id}`
            })
        }else{
            res.send(data);
        }
    })
}




exports.register = (req,res) =>{
    
    req.body.Clave = bcrypt.hashSync(req.body.Clave,10);
    Usuario.register(req.body,(err,data) => {
        console.log(err);
        if(err){
            res.status(500).send({
                message:
                    err.message || `Error Registrando Usuario`
            }) 
        }else{
            if(data.code == "ER_DUP_ENTRY"){
                res.send({
                    message: "Cuenta existente",
                    error: true
                })
            }else{
                res.send(data);
            }
            
        }
    })
}



exports.login = async (req,res) =>{
    Usuario.getFromEmail(req.body.Email,(err,data)=>{
        if(data.length <= 0){
            res.send({
                error: "Error usuario o contraseña incorrecta"
            });
        }else{
            const equal = bcrypt.compareSync(req.body.Clave,data[0].Clave);
            if(!equal){
                res.send({
                    error:"Error, usuario o contraseña incorrecta"
                })
                return;
            }else{
            console.log('====================================');
            console.log(data[0]);
            console.log('====================================');
            res.send({
                profile : data[0].Perfil,
                key: this.createToken(data),
                email:data[0].Email,
                user:data[0].Nombre,
                id: data[0].Id,
                response: "Sesión Iniciada"
            });
            }
        }
    });

}

exports.createToken = (user) => {
    let payload = {
        profile: user[0].Perfil,
        userId : user[0].Id,
        createAt: moment().unix(),
        expiresAt: moment().add(1,'day').unix()
    }
    return jwt.encode(payload,process.env.JWT_SECRET);
}