const  {Router} =require('express')
const route=Router()
const  controller=require('../controllers/ChatController')
const protectedRoutes=require('../helpers/protectedRoutes')

route.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE, OPTIONS");
    next()
});

route.post('/chat/',protectedRoutes.verifyToken,controller.create)
route.put('/chat/',protectedRoutes.verifyToken,controller.addMessage)
route.get('/chat/read/',protectedRoutes.verifyToken,controller.readMessage)
route.get('/chat/see/',protectedRoutes.verifyToken,controller.seeChats)
route.get('/chat/',protectedRoutes.verifyToken,controller.seeEspecificChat)

module.exports =route
