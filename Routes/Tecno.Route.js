const express = require('express');

const TecnoController = require('../Controllers/Tecno.Controller');
const AuthMiddle = require('../Middlewares/Auth.Middle');
const api = express.Router();

api.post('/tecno', AuthMiddle, TecnoController.createTecno);
api.get('/tecno/:iduser', TecnoController.readTecno);
api.delete('/tecno/:id', AuthMiddle, TecnoController.deleteTecno);
api.put('/tecno/:id', AuthMiddle, TecnoController.updateTecno);

module.exports = api;