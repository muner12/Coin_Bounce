const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    content:{type:String, required:true},
    blog:{type:mongoose.SchemaTypes.ObjectId,ref:'blogs'},
    author:{type:mongoose.SchemaTypes.ObjectId,ref:'users'}
},{timestamps:true});


module.exports =mongoose.model('Comment',commentSchema,'comments');