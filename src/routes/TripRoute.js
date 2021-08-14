const  {Router} =require('express')
const route=Router()
const  controller=require('../controllers/TripController')
const protectedRoutes=require('../helpers/protectedRoutes')

route.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE, OPTIONS");
    next()
});

route.post('/',protectedRoutes.verifyToken,controller.create)
route.put('/',protectedRoutes.verifyToken,controller.edit)
route.delete('/',protectedRoutes.verifyToken,controller.delete)
route.get('/mines/',protectedRoutes.verifyToken,controller.seeMyTrips)
route.get('/especific/',protectedRoutes.verifyToken,controller.seeEspecificTrip)
route.get('/',controller.seeOtherTrips)


module.exports =route
