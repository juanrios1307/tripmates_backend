const  {Router} =require('express')
const route=Router()
const  controller=require('../controllers/LikesController')
const protectedRoutes=require('../helpers/protectedRoutes')

route.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE, OPTIONS");
    next()
});

route.put('/like',protectedRoutes.verifyToken,controller.addLike)
route.put('/dislike',protectedRoutes.verifyToken,controller.addDislike)
route.put('/like/delete',protectedRoutes.verifyToken,controller.deleteLike)
route.put('/dislike/delete',protectedRoutes.verifyToken,controller.deleteDislike)
route.get('/',protectedRoutes.verifyToken,controller.getLike)

module.exports =route
