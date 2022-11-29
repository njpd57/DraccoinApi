const { handle } = require('express/lib/application');
const mysql = require('mysql');
const config = require('../config/config');

const dbConf = {
    host : config.mysql.host,
    user : config.mysql.user,
    password : config.mysql.password,
    database : config.mysql.database
};

let connection;

function handleConnection() {
    connection = mysql.createConnection(dbConf);

    connection.connect((err)=>{
        if(err){
        console.error("[-] Error: ",err);
        console.log("[?] Conectando...");
        setTimeout(handleConnection,3000);
    } else {
        console.log("[^] Conectado a DRACCOIN");
    }});

    connection.on("error", err=>{
        console.log("[-] Error: ",err);
        if(err.code === 'PROTOCOL_ERROR_LOST'){
            handleCon();
        } else {
            throw err;
        }
    })

    connection.query(`SET SESSION group_concat_max_len = 50000;`,(err,res)=>{})
}

handleConnection();

module.exports = connection;