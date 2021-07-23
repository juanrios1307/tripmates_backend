const  {Router} =require('express')
const route=Router()
const  controller=require('../controllers/UserController')
const protectedRoutes=require('../helpers/protectedRoutes')

route.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE, OPTIONS");
    next()
});

route.post('/user/',controller.signIn)
route.post('/user/',controller.logIn)
route.put('/user/',protectedRoutes.verifyToken,controller.edit)
route.delete('/user/',protectedRoutes.verifyToken,controller.delete)
route.get('/user/mine/',protectedRoutes.verifyToken,controller.seeMyProfile)
route.get('/user/',protectedRoutes.verifyToken,controller.seeOtherProfile)

module.exports =route
