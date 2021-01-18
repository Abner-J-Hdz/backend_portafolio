const Tecno = require('../Models/Tecno.Model');

exports.createTecno = async(req, res) => {
    const user_id = req.usuario_id;
    try {
        if(!req.body.title || !req.body.level || !req.body.description){
            res.status(400).json({ messaje: 'Title, level and description are required' })
            return
        }
        
        const tecno = new Tecno(req.body);
        tecno.user = user_id;
        await tecno.save();
        res.json({tecno, message: "Tecnology created"});

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Server Error'});
    }
}

exports.readTecno = async (req, res) => {
   const iduser = req.params.iduser;
   
    try {
        const tec = await Tecno.find({ user: iduser});
        if(!tec.length){
            res.send({ tec, message: "Tecnologys Empty"});
        }
        else{
            res.json({tec, message: "Get Tecnologys" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Server Error'});        
    }
    
    /*con callback
    await Tecno.find()
    .sort({ordern: "asc"})
    .exec((err, tecnoStored) => {
        if(err){
            res.status(500).send({ message: "Error de servidor"});   
        }
        else{
            if(!tecnoStored){
                res.status(200).send({ message: "dont find Tecno"});
            }
            else{
                res.status(200).send({message: "Tecno list", tecnoStored});
            }
        }
    });*/
}

exports.updateTecno = async(req, res) =>{
    const { id } = req.params;
    let tecnoData = req.body;
    console.log(tecnoData);
    //El new true es para que me devuelva el row con los valores nuevos
    try {

        const tecnoExist = await Tecno.findById(id);
        if(!tecnoExist) return res.status(404).json({ message: "Tecno not found"});

        const tecnoUpdate = await Tecno.findByIdAndUpdate({
             _id: id
            }, {
                $set: tecnoData
            }, {
                new: true
            });
        res.status(200).json({ 
            message: 'Tecno updated', 
            tecnoUpdate
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json("Server Error");
    }
}

exports.deleteTecno = async(req, res) =>{
    const id = req.params.id;
    
    try {
        await Tecno.findByIdAndRemove({_id: id});
        res.json({message: 'Tecno deleted'})
    } catch (error) {
        console.log(error);
        res.status(500).json("Server Error");
    }

}