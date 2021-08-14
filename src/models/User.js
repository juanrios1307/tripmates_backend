// Cargamos el módulo de mongoose
const mongoose =  require('mongoose');
var Schema=mongoose.Schema;

const User = mongoose.model('users',{
    email: {type:String, required:true, unique:true},
    password : {type:String, required:true},
    name: {type:String, required:true},
    phone:  {type:String, required:true},
    city: {type:String, required:true},
})

module.exports = User
