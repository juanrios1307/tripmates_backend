const  {Router} =require('express')
const route=Router()
const  controller=require('../controllers/RateController')
const protectedRoutes=require('../helpers/protectedRoutes')

route.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE, OPTIONS");
    next()
});

route.post('/',protectedRoutes.verifyToken,controller.create)
route.put('/',protectedRoutes.verifyToken,controller.edit)
route.put('/approve/',protectedRoutes.verifyToken,controller.approve)
route.get('/mine/',protectedRoutes.verifyToken,controller.readMyRates)
route.get('/',protectedRoutes.verifyToken,controller.readOtherRates)


module.exports =route
