const Controller={}

const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User=require('../models/User')

Controller.addLike = async(req,res) =>{
    const id = req.decoded.sub

    const {trip} = req.body

    const Likes ={
        trip
    }

    User.update({_id:id},{$push:{ Likes }} , function (err) {
        if (err) {
            //res.send(err);
            // Devolvemos el código HTTP 404, de usuario no encontrado por su id.
            res.status(203).json({ status: "error", data: "No se ha encontrado el viaje con id: "+trip});
        } else {
            // Devolvemos el código HTTP 200.
            res.status(200).json({ status: "ok", data: "Like" });
        }
    });



}

Controller.deleteLike = async(req,res) =>{
    const id = req.decoded.sub

    const {trip} = req.body

    const Likes ={
        trip
    }

    User.update({_id:id},{$pull:{ Likes }} , function (err) {
        if (err) {
            //res.send(err);
            // Devolvemos el código HTTP 404, de usuario no encontrado por su id.
            res.status(203).json({ status: "error", data: "No se ha encontrado el viaje con id: "+trip});
        } else {
            // Devolvemos el código HTTP 200.
            res.status(200).json({ status: "ok", data: "Like" });
        }
    });



}

Controller.addDislike = async(req,res)=>{
    const id = req.decoded.sub

    const {trip} = req.body

    const Dislikes ={
        trip
    }

    User.update({_id:id},{$push:{ Dislikes }} , function (err) {
        if (err) {
            //res.send(err);
            // Devolvemos el código HTTP 404, de usuario no encontrado por su id.
            res.status(203).json({ status: "error", data: "No se ha encontrado el viaje con id: "+trip});
        } else {
            // Devolvemos el código HTTP 200.
            res.status(200).json({ status: "ok", data: "Dislike" });
        }
    });
}

Controller.deleteDislike = async(req,res) =>{
    const id = req.decoded.sub

    const {trip} = req.body

    const Dislikes ={
        trip
    }

    User.update({_id:id},{$pull:{ Dislikes }} , function (err) {
        if (err) {
            //res.send(err);
            // Devolvemos el código HTTP 404, de usuario no encontrado por su id.
            res.status(203).json({ status: "error", data: "No se ha encontrado el viaje con id: "+trip});
        } else {
            // Devolvemos el código HTTP 200.
            res.status(200).json({ status: "ok", data: "Like" });
        }
    });



}

module.exports = Controller
