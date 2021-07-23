// Cargamos el módulo de mongoose
const mongoose =  require('mongoose');
var Schema=mongoose.Schema;

const Trip = mongoose.model('trips',{
    user: { type: Schema.ObjectId, ref: 'users' },
    from: {type:String, required:true, unique:true},
    to : {type:String, required:true},
    beginDate:  {type: Date, default: Date.now},
    finishDate:  {type:String, required:true},
})

module.exports = Trip
