const Controller={}
const Trip=require('../models/Trip')
const User = require("../models/User");


Controller.create = async(req,res)=>{


    const user=req.decoded.sub
    var {from,to,beginDate,finishDate,Interests} = req.body


    const trip=new Trip({
        user,from,to,beginDate,finishDate,Interests
    })

    await trip.save()

    res.json({
        mensaje:"Viaje registrado"
    })

}

Controller.edit = async(req,res)=>{

    const user=req.decoded.sub
    const trip= req.headers['trip']

    Trip.findByIdAndUpdate(trip, { $set: req.body }, function (err) {
        if (err) {
            //res.send(err);
            // Devolvemos el código HTTP 404, de usuario no encontrado por su id.
            res.status(203).json({ status: "error", data: "No se ha encontrado el usuario con id: "+user});
        } else {
            // Devolvemos el código HTTP 200.
            res.status(200).json({ status: "ok", data: "Datos actualizados" });
        }
    });

}

Controller.delete = async(req,res)=>{

    const user=req.decoded.sub
    const trip= req.headers['trip']

    Trip.findByIdAndRemove(trip, function(err, data) {
        if (err || !data) {
            //res.send(err);
            // Devolvemos el código HTTP 404, de producto no encontrado por su id.
            res.status(203).json({ status: "error", data: "No se ha encontrado el usuario con id: "+user});
        } else {
            res.status(200).json({ status: "ok", data: "Se ha eliminado correctamente el usuario con id: "+user});

        }
    });

}

Controller.seeMyTrips = async(req,res)=>{

    const user =req.decoded.sub

    Trip.find({user}, function (err, trips) {
        if (err) {
            // Devolvemos el código HTTP 404, de producto no encontrado por su id.
            res.status(203).json({ status: "error", data: "No se ha encontrado el usuario con id: "+req.params.id});
        } else {
            // También podemos devolver así la información:
            res.status(200).json({ status: "ok", data: trips });
        }
    })

}

Controller.seeEspecificTrip = async(req,res)=>{

    const trip= req.headers['trip']

    Trip.findById(trip, function (err, trip) {
        if (err) {
            // Devolvemos el código HTTP 404, de producto no encontrado por su id.
            res.status(203).json({ status: "error", data: "No se ha encontrado el usuario con id: "+req.params.id});
        } else {
            // También podemos devolver así la información:
            res.status(200).json({ status: "ok", data: trip });
        }
    })

}

Controller.seeOtherTrips = async(req,res)=>{


    Trip.find({}, function (err, trip) {
        if (err) {
            // Devolvemos el código HTTP 404, de producto no encontrado por su id.
            res.status(203).json({ status: "error", data: "No se ha encontrado el usuario con id: "+req.params.id});
        } else {
            // También podemos devolver así la información:
            res.status(200).json({ status: "ok", data: trip });
        }
    })

}

module.exports = Controller
