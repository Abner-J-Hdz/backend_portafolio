const Project = require('../Models/Project.Model');

exports.createProject = async(req, res) => {
    const user_id = req.usuario_id;

    try {
        if(!req.body.name || !req.body.gitLink || !req.body.description || !req.body.tecnologys.length || !req.body.img.length){
            res.status(400).json("name, gitlink, description, tecnologys and images are required");
            return
        }

        const project = new Project(req.body); 
        project.user = user_id;
        await project.save();

        res.json({ project, message: "Project created"});

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error"})
    }
}

exports.readProject = async(req, res) => {
    
    const id = req.params.iduser;
    try {
        const project = await Project.find({user: id });
        if(!project.length){
            res.json({ message: "No Project" });
        }else{
            res.json({ project, message: "Get project success"});
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error"});     
    }
}

exports.updateProject = async(req, res) => {
    const id = req.params.id;
    const newProject =  req.body;
    try {
        let project = await Project.findById(id);
        if(!project) return res.status(404).json({ message: "Project not found"});
        if(project.user.toString() !== id) return res.status(404).json({messaje:"Unauthorized"});

        project = await Project.findByIdAndUpdate({
            _id: id},
            {
                $set: newProject
            },{
                new: true
            });

        res.json({ message: "updated project", project})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error"});        
    }
}

exports.deleteProject = async(req, res) => {
    const id = req.params.id;
    try {
        let project = await Project.findById(id);
        if(!project) return res.status(404).json({ message: "Project not found"});
        if(project.user.toString() !== id) return res.status(404).json({messaje:"Inauthorized"});

        await Project.findByIdAndRemove({_id: id})

        res.json({ message: "Deleted project"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error"});        
    }
}
