// Cargamos el módulo de mongoose
const mongoose =  require('mongoose');
var Schema=mongoose.Schema;
// Usaremos los esquemas

// Creamos el objeto del esquema y sus atributos
const Rate = mongoose.model('rates',{
    user: {type: Schema.Types.ObjectId, ref: 'users'},
    comment: {type:String, required:true},
    rating:  {type:Number, required:true},
    date: { type: Date, default: Date.now() },
    aproved : {type:Boolean}

})

// Exportamos el modelo para usarlo en otros ficheros
module.exports = Rate
