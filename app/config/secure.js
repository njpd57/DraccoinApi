const jwt = require("jwt-simple");

exports.checkToken = (req,res,next) =>{
    const authHeaders = req.headers['authorization']
    const token = authHeaders && authHeaders.split(' ')[1];

    if(token == null) return res.sendStatus(401);

    try{
        var response = jwt.decode(token,process.env.JWT_SECRET);
    } catch(err){
        return res.sendStatus(401);
    }
    
    req.body.Usuario = response.userId;
    req.body.tokenProfile = response.profile;
    next();
}


exports.appCheck=(req,res,next) =>{
    if(req.get("origin") == process.env.WEB_URL){
        req.body.isWeb = true;
    }
    //debug
    //req.body.isWeb = true;
    next();
}

exports.checkTokenDEBUG = (req,res,next) =>{
    const authHeaders = req.headers['authorization']
    const token = authHeaders && authHeaders.split(' ')[1];

    if(token == null) {
        next();
        return;   
    }

    try{
        var response = jwt.decode(token,process.env.JWT_SECRET);
    } catch(err){
        next();
        
    }
    
    req.body.Usuario = response.userId;
    req.body.tokenProfile = response.profile;
    next();
}