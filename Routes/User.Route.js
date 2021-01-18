const express = require('express');

const UserController = require('../Controllers/User.Controller');
const AuthMiddle =  require('../Middlewares/Auth.Middle');
const api = express.Router();

api.post('/sign-up', UserController.signUp)
api.post('/sign-in', UserController.logIn)
api.get('/auth', AuthMiddle, UserController.getUser);
//api.post('/login', UserController.login)

module.exports = api;
