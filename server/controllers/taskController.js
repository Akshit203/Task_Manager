const task = require('../models/task.js')

const createTask = async(req,res)=>{
    const data = req.body;

    try{
        const model = new task(data);
        await model.save();
        res.status(201).json({message : "task created ", success : true})
    }
    catch(err){
        res.status(500).json({message : "Failed", success : false})
    }
}


module.exports = {
    createTask
}