// Cargamos el módulo de mongoose
const mongoose =  require('mongoose');
var Schema=mongoose.Schema;
// Usaremos los esquemas

// Creamos el objeto del esquema y sus atributos
const Chat = mongoose.model('chats',{
    user1: { type: Schema.ObjectId, ref: 'users' },
    user2: { type: Schema.ObjectId, ref: 'users' },
    Messages:[{
        message: {type: String, required: true},
        date: {type: Date, default: Date.now},
        emit: {type: String, required: true},
        read:{type:Boolean, default:false}
    }]

})

// Exportamos el modelo para usarlo en otros ficheros
module.exports = Chat
