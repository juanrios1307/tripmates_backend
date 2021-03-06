const Controller={}

const User=require('../models/User')
const Trip = require('../models/Trip')

Controller.createFeed = async(req,res)=>{

    //El feed debe traer los usuarios que tengan viajes compatibles con el usuario a ver

    //Un viaje es compatible si tienen un destino igual - y las fechas se solapan
    //fechas solapadas son aquellas que el inicio de uno es menor al fin del otro es decir
    //viaje 1 : 20/8 - 25/8 : viaje 2: 22/8 - 29/8
    user = req.decoded.sub

    const myTrips = await getUserTrips(res,user)

    const users = await getTrips(res,myTrips)

    res.status(200).json({status:'ok',data:users})
}

//Obtiene viajes de un usuario
const getUserTrips= async (res,user)=>{
    return new Promise((resolve,reject)=>{
        Trip.find({user}, function (err, trips) {
            if (err) {
                // Devolvemos el código HTTP 404, de producto no encontrado por su id.
                res.status(203).json({status: "error", data: "Error user trips"});
            } else {
                resolve(trips)
            }
        }).populate('user')
    })
}

//
const getTrips = async(res,trips)=>{
    return new Promise(async (resolve, reject) => {
        var users = []
        for (var i = 0; i < trips.length; i++) {
            const ct=await getCompatibleTrips(res, trips[i])

            if(ct.length > 0 ){
                for(var j=0; j<ct.length ; j++){
                    users.push(ct[j])
                }
            }
        }

        resolve(users)
    })
}

//obtiene viajes compatibles con otro usuario
const getCompatibleTrips= async (res,trip) => {
    return new Promise((resolve, reject) => {
        console.log(trip)
        Trip.find({
                $and: [
                    {'to': trip.to},
                    {
                        $or: [
                            {'beginDate': {$gte: (trip.beginDate), $lte: (trip.finishDate)}},
                            {'finishDate': {$gte: (trip.beginDate), $lte: (trip.finishDate)}},
                            {$and : [{'beginDate': {$lte: (trip.beginDate)}},{'finishDate': {$gte: (trip.beginDate)}}]}
                        ]
                    },
                    {'user':{$ne: trip.user._id}},
                    {'Interests':{$in : trip.Interests}},
                    {'_id':{$nin : trip.user.Likes}},
                    {'_id':{$nin : trip.user.Dislikes}}
                ]
            },
            async function (err, compatibleTrip) {
                if (err) {
                    // Devolvemos el código HTTP 404, de producto no encontrado por su id.
                    res.status(203).json({status: "error", data: err});
                } else {

                    resolve(compatibleTrip)
                }
            }).populate('user')
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

    const {to} = req.body

    Trip.find({to}, function (err, trip) {
        if (err) {
            // Devolvemos el código HTTP 404, de producto no encontrado por su id.
            res
                .status(203)
                .json({
                    status: "error",
                    data: "No se ha encontrado el usuario con id: " + req.params.id,
                });
        } else {
            // También podemos devolver así la información:
            res.status(200).json({ status: "ok", data: trip });
        }
    });

}

Controller.filterMapByDates = async(req,res)=>{

    const {begin,finish} = req.body

    Trip.find({$and:[
                {'beginDate': {$gte: (begin)}},
                {'finishDate': {$lte: (finish)}}
            ]},
        async function (err, trips) {
            if (err) {
                // Devolvemos el código HTTP 404, de producto no encontrado por su id.
                res.status(203).json({status: "error", data: err});
            } else {

                res.status(200).json({ status: "ok", data: trips });
            }
        }).populate('user')

}

Controller.filterMapByInterests = async(req,res)=>{

    const {Interests} = req.body

    Trip.find({Interests}, function (err, trip) {
        if (err) {
            // Devolvemos el código HTTP 404, de producto no encontrado por su id.
            res
                .status(203)
                .json({
                    status: "error",
                    data: "No se ha encontrado el usuario con id: " + req.params.id,
                });
        } else {
            // También podemos devolver así la información:
            res.status(200).json({ status: "ok", data: trip });
        }
    });

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
