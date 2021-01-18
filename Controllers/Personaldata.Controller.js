const Personaldata = require('../Models/Personaldata.Model');

exports.createPersonaldata = async(req, res) => {
    const user_id = req.usuario_id;
    
    try {
        if(!user_id || !req.body.email || !req.body.phone || !req.body.email || !req.body.facebook || !req.body.github)
            return res.status(400).json( { message: "Facebook, email, github and phone are required"});

        let personalData = new Personaldata(req.body);
        personalData.user = user_id;

        await personalData.save();

        res.json({ message: "Created"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error"});
    }
}

exports.readPersonaldata = async(req, res) => {
    const iduser = req.params.iduser;
    try {
        const personalData = await Personaldata.find({ user: iduser});
        if(!personalData){
            res.json({message: "Personal Data is empty"});
        }
        else{
            res.json({ personalData ,message: "Get Personal Data"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error"});
    }
}

exports.updatePersonaldata = async(req, res) => {
    const id = req.params.id;
    const newPersonalData = req.body;
    try {
        let personalData = Personaldata.findById(id);
        if(!personalData)
            return res.status(404).json({ message: "Personaldata not found"});

        personalData = await Personaldata.findByIdAndUpdate({
            _id: id
        },{
            $set: newPersonalData 
        },{
            new: true
        });

        res.json({ message: "Personal data updated", personalData});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error"});
    }
}

exports.deletePersonaldata = async(req, res) => {
    const id = req.params.id;

    try {
        let personalData = Personaldata.findById(id);
        if(!personalData)
            return res.status(404).json({ message: "Personaldata not found"});

        await Personaldata.findByIdAndRemove({_id:id});
        res.json({ message: "Personal data deleted"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error"});
    }
}