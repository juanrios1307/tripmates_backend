const  {Router} =require('express')
const route=Router()
const  controller=require('../controllers/BuscadorController')
const protectedRoutes=require('../helpers/protectedRoutes')

route.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE, OPTIONS");
    next()
});

route.get('/feed/',protectedRoutes.verifyToken,controller.createFeed)
route.get('/feed/filterDestiny/',protectedRoutes.verifyToken,controller.filterFeedByDestiny)
route.get('/feed/filterDate/',protectedRoutes.verifyToken,controller.filterFeedByDates)
route.get('/feed/filterInterest/',protectedRoutes.verifyToken,controller.filterFeedByInterests)

route.get('/map/',protectedRoutes.verifyToken,controller.createMap)
route.get('/map/filterDestiny/',protectedRoutes.verifyToken,controller.filterMapByDestiny)
route.get('/map/filterDate/',protectedRoutes.verifyToken,controller.filterMapByDates)
route.get('/map/filterInterest/',protectedRoutes.verifyToken,controller.filterMapByInterests)
route.get('/map/data/',protectedRoutes.verifyToken,controller.seeDataInMap)

module.exports =route
