const jwt = require('jsonwebtoken');
require('dotenv').config({path: 'variables.env'});

module.exports = function(req, res, next){
    //Obtener eltoken del header de la peticion
    const token = req.header('x-auth-token');

    if(!token){
        return res.status(401).json({ message: 'No hay token, no tiene permisos'});
    }

    //verificar token
    try {
        const cifrado = jwt.verify(token, process.env.SECRET);
        //agregamos al el usuario en una parte del request
        req.usuario_id= cifrado.user._id;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token no valido'});
    }

    //console.log(token);
}