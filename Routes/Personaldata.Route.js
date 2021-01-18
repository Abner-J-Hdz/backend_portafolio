const express = require('express');
const PersonaldataController = require('../Controllers/Personaldata.Controller');
const AuthMiddle = require('../Middlewares/Auth.Middle');
const api = express.Router();

api.post("/personaldata", AuthMiddle, PersonaldataController.createPersonaldata);
api.get("/personaldata/:iduser", PersonaldataController.readPersonaldata);
api.put("/personaldata/:id", AuthMiddle, PersonaldataController.updatePersonaldata);
api.delete("/personaldata/:id", AuthMiddle, PersonaldataController.deletePersonaldata);

module.exports = api;