const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema;

const task1 = new TaskSchema({
    taskName : {type : String, required : true},
    
    isDone : {type : Boolean, required : true}
});

const Model = mongoose.model('list', task1);
module.exports = Model;