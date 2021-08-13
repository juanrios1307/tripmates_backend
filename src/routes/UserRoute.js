const  {Router} =require('express')
const route=Router()
const  controller=require('../controllers/UserController')
const protectedRoutes=require('../helpers/protectedRoutes')

route.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE, OPTIONS");
    next()
});

route.post('/',controller.signIn)
route.post('/login',controller.logIn)
route.put('/',protectedRoutes.verifyToken,controller.edit)
route.delete('/',protectedRoutes.verifyToken,controller.delete)
route.get('/mine/',protectedRoutes.verifyToken,controller.seeMyProfile)
route.get('/profile/',protectedRoutes.verifyToken,controller.seeOtherProfile)
route.get('/',protectedRoutes.verifyToken,controller.seeProfiles)

module.exports =route
