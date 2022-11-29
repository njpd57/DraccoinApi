const express = require("express");
const cors = require("cors");
const config = require("./app/config/config");
const app = express();

//const Estado = require("./app/routes/Estado.route");
const Usuario = require("./app/routes/Usuario.route");

app.use(express.json({limit: '50mb'}));
app.use(cors({
    origin: config.cors.origin,
    methods: ['GET','POST','DELETE','PUT']
}))

//app.use("/api/Estado",Estado);
app.use("/api/usuario",Usuario);
app.listen(config.api.port, () => {
    console.log('Api escuchando en el puerto ', config.api.port);
});
