const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User.Model');
require('dotenv').config({path: 'variables.env'});

exports.signUp = async (req, res) => {
    console.log("Creando usuario");

    const {name, lastname, email, password, repeatPassword, role, active } = req.body;

    //verificar las contraseña
    if(!password || !repeatPassword)
        return res.status(400).json({ message: 'Las contraseña son obligatorias'})

    if(password !== repeatPassword)
        return res.status(400).json({ message: 'Las contraseña no son iguales'})
    
    if(password.length < 6)
        return res.status(400).json({ message: 'La contraseña debe tener mas de 6 carateres'})

    try {
    //verificar email
    let user = await User.findOne({email: email.toLowerCase()});
    if(user)
        return res.status(400).json({ message: 'El usuario ya existe'});
    
    //crear una instancia de user
    user = new User(req.body);
    
    //hashear password con bcript-nodejs
    const salt = await bcrypt.genSalt(15);//salt conjunto de bits para encriptar
    user.password = await bcrypt.hash(password, salt);

    user.email = email.toLowerCase();

    //guardamos el usuario
    await user.save();
    res.status(200).json({ message: 'Usuario creado exitosamente'});
    
    } catch (error) {
        console.log(error);
        res.status(400).json({messaje: 'Hubo un error al crear usuario'});
    }
}

exports.logIn = async (req, res) => {
    const email = req.body.email.toLowerCase();
    const password  = req.body.password;

    if(!password || !email) return res.satus(400).json({ message: "Email y contraseña es obligatorio"});

    try {
        let usuario = await User.findOne({ email });
        if(!usuario){
            return res.status(404).json({ message: 'El usuario no existe'});
        }
        if(!usuario.active) return res.status(404).json({ message: 'Usuario inactivo'});
        const passCorrecto = await bcrypt.compare(password, usuario.password);
        if(!passCorrecto){
            return res.status(404).json({ message: 'Contraseña incorrecta'});
        }
        const payload = {
            user:{
                _id: usuario._id,
                name: usuario.name,
                lastname: usuario.lastname,
                email: usuario.email,
                role: usuario.role
            }
        };  
        //firmar el jwt
        jwt.sign(payload, process.env.SECRET,{
            expiresIn: 36000
        }, (err, token) => {
            if(err) throw err;

            //mensaje de confirmacion
            res.status(200).json({ 
                message: 'Login Exitoso', 
                token, 
        });
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Hubo un error"});
    }
}

exports.updateUser = (req, res) => {
    console.log('funcion de actualizacion');
}

exports.getUser = async(req, res) => {

    try {
        const user = await User.findById(req.usuario_id).select('-password');
        res.json({user});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error"});
    }
}