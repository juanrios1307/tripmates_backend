const Controller={}

const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User=require('../models/User')

Controller.addLike = async(req,res) =>{
    const id = req.decoded.sub

    const {trip} = req.body

    User.update({_id:id},{$push:{ Likes:trip }} , function (err) {
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

Controller.getLike = async(req,res) =>{
    const id = req.decoded.sub

    User.findById(id,{Likes:1} , function (err,trips) {
        if (err) {
            //res.send(err);
            // Devolvemos el código HTTP 404, de usuario no encontrado por su id.
            res.status(203).json({ status: "error", data: "No se ha encontrado el viaje con id: "});
        } else {
            // Devolvemos el código HTTP 200.
            res.status(200).json({ status: "ok", data: trips });
        }
    }).populate('trip');



}

Controller.deleteLike = async(req,res) =>{
    const id = req.decoded.sub

    const {trip} = req.body

    User.update({_id:id},{$pull:{ Likes:trip }} , function (err) {
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

    User.update({_id:id},{$push:{ Dislikes:trip }} , function (err) {
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

    User.update({_id:id},{$pull:{ Dislikes:trip }} , function (err) {
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
