const Controller={}

const User=require('../models/User')
const Trip = require('../models/Trip')

Controller.createFeed = async(req,res)=>{

    //El feed debe traer los usuarios que tengan viajes compatibles con el usuario a ver

    //Un viaje es compatible si tienen un destino igual - y las fechas se solapan
    //fechas solapadas son aquellas que el inicio de uno es menor al fin del otro es decir
    //viaje 1 : 20/8 - 25/8 : viaje 2: 22/8 - 29/8
    user = req.decoded.sub

    const trips = getUserTrips(user)

    var users =[]
    for( var i=0 ; i<trips.length ; i++){
        await users.append(getCompatibleTrips(trips[i]))
    }

    await res.status(200).json({ status: "error", data: users});

}

const getUserTrips= async (user)=>{
    await Trip.find({user}, function (err, trips) {
        if (err) {
            // Devolvemos el código HTTP 404, de producto no encontrado por su id.
            res.status(203).json({ status: "error", data: "No se ha encontrado el usuario con id"});
        } else {

            return trips
        }
    })
}

const getCompatibleTrips= async (trip) =>{

    var users=[]

    await Trip.find({$and:[
                {'to' : trip.to},
                {$or: [
                    {'beginDate':{$gte:ISODate(trip.beginDate),$lt:ISODate(trip.finishDate)}},
                    {$and:[{'beginDate':{$gte:ISODate(trip.beginDate)}},{'finishDate':{$lt:ISODate(trip.beginDate)}}]}
                ]}

            ]},
            async function(err, compatibleTrip){
                if (err) {
                    // Devolvemos el código HTTP 404, de producto no encontrado por su id.
                    res.status(203).json({ status: "error", data: "No se ha encontrado el usuario con id"});
                } else {

                  return await compatibleTrip.user
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
