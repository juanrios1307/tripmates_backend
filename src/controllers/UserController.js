const Controller={}

const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User=require('../models/User')

Controller.signIn = async(req,res)=>{

    var {email,password,name,phone,city} = req.body

    if(await User.findOne({email})){
        res.json({
            mensaje:"El correo : "+email+" esta en uso"
        })
    }else{
        password=bcrypt.hashSync(password,10);

        const user=new User({
            email,
            password,
            name,
            phone,
            city
        })

        await user.save()

        res.json({
            mensaje:"Viajero registrado, puede iniciar sesión"
        })

    }
}

Controller.logIn = async(req,res)=>{

    const {email, password} =req.body

    const user = await User.findOne({email});

    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({sub: user.id}, config.secret,
            {expiresIn: 8640000});

        res.status(200).json({
            token:token ,
            mensaje:"Sesion Iniciada"
        });

    }else {
        res.status(203).json({ mensaje: "Usuario o contraseña incorrectos"})
    }
}

Controller.edit = async(req,res)=>{

    const user=req.decoded.sub

    User.findByIdAndUpdate(user, { $set: req.body }, function (err) {
        if (err) {
            //res.send(err);
            // Devolvemos el código HTTP 404, de usuario no encontrado por su id.
            res.status(203).json({ status: "error", data: "No se ha encontrado el usuario con id: "+user});
        } else {
            // Devolvemos el código HTTP 200.
            res.status(200).json({ status: "ok", data: "Datos actualizados" });
        }
    });

}

Controller.delete = async(req,res)=>{

    const user=req.decoded.sub

    User.findByIdAndRemove(user, function(err, data) {
        if (err || !data) {
            //res.send(err);
            // Devolvemos el código HTTP 404, de producto no encontrado por su id.
            res.status(203).json({ status: "error", data: "No se ha encontrado el usuario con id: "+user});
        } else {
            res.status(200).json({ status: "ok", data: "Se ha eliminado correctamente el usuario con id: "+user});

        }
    });

}

Controller.seeMyProfile = async(req,res)=>{

    const user =req.decoded.sub
    User.findById(user, function (err, user) {
        if (err) {
            // Devolvemos el código HTTP 404, de producto no encontrado por su id.
            res.status(203).json({ status: "error", data: "No se ha encontrado el usuario con id: "+req.params.id});
        } else {
            // También podemos devolver así la información:
            res.status(200).json({ status: "ok", data: user });
        }
    })

}

Controller.seeOtherProfile = async(req,res)=>{

    const user =req.headers['id']

    User.findById(user, function (err, user) {
        if (err) {
            // Devolvemos el código HTTP 404, de producto no encontrado por su id.
            res.status(203).json({ status: "error", data: "No se ha encontrado el usuario con id: "+req.params.id});
        } else {
            // También podemos devolver así la información:
            res.status(200).json({ status: "ok", data: user });
        }
    })

}

Controller.seeProfiles = async(req,res) =>{

    User.find({}, function (err, users) {
        if (err) {
            // Devolvemos el código HTTP 404, de producto no encontrado por su id.
            res.status(203).json({ status: "error", data: "No se ha encontrado el usuario con id: "+req.params.id});
        } else {
            // También podemos devolver así la información:
            res.status(200).json({ status: "ok", data: users });
        }
    })
}

module.exports = Controller
