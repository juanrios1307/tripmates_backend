const Controller={}

const User=require('../models/User')

Controller.create = async(req,res)=>{

    const id = req.decoded.sub
    const user = req.headers['user']
    const {comment,rating} = req.body

    const Rating ={
        user:id,
        comment,
        rating,
        aproved:false
    }

    User.update({_id:user},{$push:{ Rating }} , function (err) {
        if (err) {
            //res.send(err);
            // Devolvemos el código HTTP 404, de usuario no encontrado por su id.
            res.status(203).json({ status: "error", data: "No se ha encontrado el usuario con id: "+user});
        } else {
            // Devolvemos el código HTTP 200.
            res.status(200).json({ status: "ok", data: "Rating Agregado" });
        }
    });

}

Controller.edit = async(req,res)=>{

    const id = req.decoded.sub

    const {comment,rating,user,rate} = req.body
    var query = {}

    if(comment != undefined){
        query ={ "Rating.$.comment":comment}
    }

    if(rating != undefined){
        query ={ "Rating.$.rating":rating}
    }

    User.update({_id:user,"Rating._id":rate},{$set:query},function (err) {
        if (err) {
            //res.send(err);
            // Devolvemos el código HTTP 404, de usuario no encontrado por su id.
            res.status(203).json({ status: "error", data: "No se ha encontrado el usuario con id: "+user});
        } else {
            // Devolvemos el código HTTP 200.
            res.status(200).json({ status: "ok", data: rating});
        }
    });

}

Controller.approve = async(req,res)=>{

    const id = req.decoded.sub

    const {aprove,rating} = req.body

    User.update({_id:id,"Rating._id":rating},{$set:{"Rating.$.aproved":aprove}},function (err) {
        if (err) {
            //res.send(err);
            // Devolvemos el código HTTP 404, de usuario no encontrado por su id.
            res.status(203).json({ status: "error", data: "No se ha encontrado el usuario"});
        } else {
            // Devolvemos el código HTTP 200.
            res.status(200).json({ status: "ok", data: "Comentario Aprobado: "+aprove});
        }
    });

}

Controller.readMyRates = async(req,res)=>{

    const id = req.decoded.sub

    User.findById(id,{Rating:1},function (err,rating) {
        if (err) {
            //res.send(err);
            // Devolvemos el código HTTP 404, de usuario no encontrado por su id.
            res.status(203).json({ status: "error", data: "No se ha encontrado el usuario con id: "+user});
        } else {
            // Devolvemos el código HTTP 200.
            res.status(200).json({ status: "ok", data: rating});
        }
    }).populate({
        path: 'Rating',
        populate :{
            path: 'user',
            model: 'users'
        }
    });

}

Controller.readOtherRates = async(req,res)=>{

    const id = req.headers['user']

    User.find({_id:id},{Rating:1},function (err,rating) {
        if (err) {
            //res.send(err);
            // Devolvemos el código HTTP 404, de usuario no encontrado por su id.
            res.status(203).json({ status: "error", data: "No se ha encontrado el usuario con id: "+user});
        } else {
            // Devolvemos el código HTTP 200.
            res.status(200).json({ status: "ok", data: rating});
        }
    }).populate({
        path: 'Rating',
        populate :{
            path: 'user',
            model: 'users'
        }
    });

}

module.exports = Controller
