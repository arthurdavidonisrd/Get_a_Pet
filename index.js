const express = require('express')
const cors = require('cors')

const app = express()

//Config json response
app.use(express.json())

//solve CORS
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

//folder for images
app.use(express.static('public'))

//Routes
const UserRoutes = require('./routes/UserRoutes')
const PetsRoutes = require('./routes/PetRoutes')
app.use('/users', UserRoutes)
app.use('/pets', PetsRoutes)


app.listen(5000)