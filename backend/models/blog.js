const mongoose = require('mongoose');

const blogSchem= new mongoose.Schema({

    title:{type:String, required:true},
    content:{type:String, required:true},
    photoPath:{type:String, required:true},
    auth:{type:mongoose.SchemaTypes.ObjectId,ref:"users"}

},{timestamps:true});


module.exports = mongoose.model('Blog',blogSchem,'blogs');