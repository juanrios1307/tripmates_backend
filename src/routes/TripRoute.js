const  {Router} =require('express')
const route=Router()
const  controller=require('../controllers/TripController')
const protectedRoutes=require('../helpers/protectedRoutes')

route.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE, OPTIONS");
    next()
});

route.post('/trip/',protectedRoutes.verifyToken,controller.create)
route.put('/trip/',protectedRoutes.verifyToken,controller.edit)
route.delete('/trip/',protectedRoutes.verifyToken,controller.delete)
route.get('/trip/mines/',protectedRoutes.verifyToken,controller.seeMyTrips)
route.get('/trip/especific/',protectedRoutes.verifyToken,controller.seeEspecificTrip)
route.get('/trip/',protectedRoutes.verifyToken,controller.seeOtherTrips)


module.exports =route
