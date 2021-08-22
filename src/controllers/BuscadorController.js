const Controller={}

const User=require('../models/User')
const Trip = require('../models/Trip')

Controller.createFeed = async(req,res)=>{

    //El feed debe traer los usuarios que tengan viajes compatibles con el usuario a ver

    //Un viaje es compatible si tienen un destino igual - y las fechas se solapan
    //fechas solapadas son aquellas que el inicio de uno es menor al fin del otro es decir
    //viaje 1 : 20/8 - 25/8 : viaje 2: 22/8 - 29/8
    user = req.decoded.sub



    const trips = await getUserTrips(res,user)

    const users = await getTrips(res,trips)

    res.status(200).json({status:'ok',data:users})
}

//Obtiene viajes de un usuario
const getUserTrips= async (res,user)=>{
    return new Promise((resolve,reject)=>{
        Trip.find({user}, function (err, trips) {
            if (err) {
                // Devolvemos el código HTTP 404, de producto no encontrado por su id.
                res.status(203).json({status: "error", data: "No se ha encontrado el usuario con id"});
            } else {
                resolve(trips)
            }
        })
    })
}

//
const getTrips = async(res,trips)=>{
    return new Promise(async (resolve, reject) => {
        var users = []
        console.log(trips.length)
        for (var i = 0; i < trips.length; i++) {
            users.push(await getCompatibleTrips(res, trips[i]))
            console.log("TRIPS:::::::::: "+i+"  ::  "+users)
        }
        console.log("GT: " + users)
        resolve(users)
    })
}

//obtiene viajes compatibles con otro usuario
const getCompatibleTrips= async (res,trip) => {
    return new Promise((resolve, reject) => {

        Trip.find({
                $and: [
                    {'to': trip.to},
                    {
                        $or: [
                            {'beginDate': {$gte: (trip.beginDate), $lte: (trip.finishDate)}}
                        ]
                    }

                ]
            },
            async function (err, compatibleTrip) {
                if (err) {
                    // Devolvemos el código HTTP 404, de producto no encontrado por su id.
                    res.status(203).json({status: "error", data: "No se ha encontrado el usuario con id"});
                } else {
                    console.log("CT: " + compatibleTrip)
                    resolve(compatibleTrip)
                }
            })
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

        ]},function(err,trips){
        if (err) {
            // Devolvemos el código HTTP 404, de producto no encontrado por su id.
            res.status(203).json({ status: "error", data: "No se ha encontrado"});
        } else {

            // También podemos devolver así la información:
            res.status(200).json({ status: "ok", data: trips });
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
            res.status(200).json({ status: "ok", data: users });
        }
    })

}

module.exports = Controller
