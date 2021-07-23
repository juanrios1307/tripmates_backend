const  {Router} =require('express')
const route=Router()
const  controller=require('../controllers/RateController')
const protectedRoutes=require('../helpers/protectedRoutes')

route.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE, OPTIONS");
    next()
});

route.post('/rate/',protectedRoutes.verifyToken,controller.create)
route.put('/rate/',protectedRoutes.verifyToken,controller.edit)
route.put('/rate/approve/',protectedRoutes.verifyToken,controller.approve)
route.get('/rate/mine/',protectedRoutes.verifyToken,controller.readMyRates)
route.get('/rate/',protectedRoutes.verifyToken,controller.readOtherRates)


module.exports =route
