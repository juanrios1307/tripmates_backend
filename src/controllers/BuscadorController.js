const Controller={}

const User=require('../models/User')
const Trip = require('../models/Trip')

Controller.createFeed = async(req,res)=>{
    Trip.find({}, function (err, trips) {
        if (err) {
            // Devolvemos el código HTTP 404, de producto no encontrado por su id.
            res.status(203).json({ status: "error", data: "No se ha encontrado el usuario con id: "+req.params.id});
        } else {
            // También podemos devolver así la información:
            res.status(200).json({ status: "ok", data: trips });
        }
    })
}

Controller.filterFeedByDestiny = async(req,res)=>{

}

Controller.filterFeedByDates = async(req,res)=>{

}

Controller.filterFeedByInterests = async(req,res)=>{

}

Controller.createMap = async(req,res)=>{

}

Controller.filterMapByDestiny = async(req,res)=>{

}

Controller.filterMapByDates = async(req,res)=>{

}

Controller.filterMapByInterests = async(req,res)=>{

}

Controller.seeDataInMap = async(req,res) =>{

}

Controller.searchTrips = async(req, res)=>{
    const s=req.headers['condicion']

    Trip.find({$or:[
            {"from":{$regex :  new RegExp("^"+s+".*",'i' )}},
            {"to":{$regex :  new RegExp("^"+s+".*",'i') }}

        ]},function(err,pets){
        if (err) {
            // Devolvemos el código HTTP 404, de producto no encontrado por su id.
            res.status(203).json({ status: "error", data: "No se ha encontrado"});
        } else {

            // También podemos devolver así la información:
            res.status(200).json({ status: "ok", data: pets });
        }
    }).populate('user')
}

Controller.searchUsers = async(req,res)=>{

    const s=req.headers['condicion']

    User.find({$or:[
            {"name":{$regex :  new RegExp("^"+s+".*",'i' )}},
            {"phone":{$regex :  new RegExp("^"+s+".*",'i') }}

        ]},function(err,users){
        if (err) {
            // Devolvemos el código HTTP 404, de producto no encontrado por su id.
            res.status(203).json({ status: "error", data: "No se ha encontrado"});
        } else {

            // También podemos devolver así la información:
            res.status(200).json({ status: "ok", data: pets });
        }
    })

}

module.exports = Controller
