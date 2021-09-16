const Controller={}

const User=require('../models/User')
const Chat=require('../models/Chat')

Controller.create = async(req,res)=>{

    const user1 = req.decoded.sub

    const {user2} = req.body

    const chat=new Chat({
        user1,
        user2,
        Messages:[{
            message:"Hola, quiero que conectemos para tu proximo viaje",
            transmitter:user1,
            read:false
        }]
    })

    await chat.save()

    res.status(200).json({ status: "ok", data: "Chat Creado" });
}

Controller.addMessage = async(req,res)=>{

    const transmitter = req.decoded.sub

    const {chat,message} = req.body

    const Messages ={
        message,
        transmitter,
        read:false
    }

    Chat.update({_id:chat},{$push:{ Messages }} , function (err) {
        if (err) {
            //res.send(err);
            // Devolvemos el código HTTP 404, de usuario no encontrado por su id.
            res.status(203).json({ status: "error", data: "No se ha encontrado el chat "});
        } else {
            // Devolvemos el código HTTP 200.
            res.status(200).json({ status: "ok", data: "Mensaje Enviado" });
        }
    });

}

Controller.readMessage = async(req,res)=>{

    const id = req.decoded.sub

    const {read,chat} = req.body

    Chat.update({_id:chat,"Messages.transmitter":{$ne : id}},{$set:{"Messages.$.read":read}},function (err) {
        if (err) {
            //res.send(err);
            // Devolvemos el código HTTP 404, de usuario no encontrado por su id.
            res.status(203).json({ status: "error", data: "No se ha encontrado el usuario"});
        } else {
            // Devolvemos el código HTTP 200.
            res.status(200).json({ status: "ok", data: "Cmentario Aprobado"});
        }
    });

}

Controller.seeChats = async(req,res)=>{

    const user=req.decoded.sub

    Chat.find({$or:[{user1:user},{user2:user}]},function(err,chats){
        if (err) {
            //res.send(err);
            // Devolvemos el código HTTP 404, de usuario no encontrado por su id.
            res.status(203).json({ status: "error", data: "No se ha encontrado el usuario con id: "+user});
        } else {
            // Devolvemos el código HTTP 200.
            res.status(200).json({ status: "ok", data: chats}).populate('user2').populate('user1');
        }
    });
}

Controller.seeEspecificChat = async(req,res)=>{

    const chat = req.headers['chat']

    Chat.find({_id:chat},function(err,chats){
        if (err) {
            //res.send(err);
            // Devolvemos el código HTTP 404, de usuario no encontrado por su id.
            res.status(203).json({ status: "error", data: "No se ha encontrado el usuario con id: "+user});
        } else {
            // Devolvemos el código HTTP 200.
            res.status(200).json({ status: "ok", data: chats});
        }
    });

}

module.exports = Controller
