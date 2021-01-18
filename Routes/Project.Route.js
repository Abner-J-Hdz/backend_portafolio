const Express = require('express');
const ProjectController = require('../Controllers/Project.Controller');
const AuthMiddle = require('../Middlewares/Auth.Middle');

const api = Express.Router();

api.post("/project",AuthMiddle, ProjectController.createProject);
//obtiene los proyectos de un usuario
api.get("/project/:iduser", ProjectController.readProject);
//actualiza el proyecto de un usuario(id: idProyecto)
api.put("/project/:id",AuthMiddle, ProjectController.updateProject);
//elimina el proyecto de un usuario(id: idProyecto)
api.delete("/project/:id",AuthMiddle, ProjectController.deleteProject)

module.exports = api;