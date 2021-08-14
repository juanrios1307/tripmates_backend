const express=require('express')
const app=express()
const morgan=require('morgan')
const cors= require('cors')
const bodyparser=require('body-parser')


require('./helpers/database')

app.set('Port',5000)

app.use(morgan('dev'))
app.use(bodyparser.urlencoded({extend:true}))
app.use(bodyparser.json())
app.use(cors({origin:true}))


//Declaracion de rutas para manejo de api
app.use('/api/',require('./routes/BuscadorRoute'))
app.use('/api/chat',require('./routes/ChatRoute'))
app.use('/api/rate',require('./routes/RateRoute'))
app.use('/api/trip',require('./routes/TripRoute'))
app.use('/api/user',require('./routes/UserRoute'))

//start server
app.listen(process.env.PORT || 5000,()=>{
    console.log('Listen in the port ',process.env.PORT)
})

