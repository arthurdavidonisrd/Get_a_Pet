const jwt = require('jsonwebtoken')

const User = require('../models/User')

const getUserByToken = async (token) => {


    if(!token){
        return res.status(401).json({message:"Acesso Negado!"})
        return;
    }

    const decoded = jwt.verify(token, "nossosecretkey")

    const userId = decoded.id 

    const user = await User.findOne({_id: userId})

    return user;
}

module.exports = getUserByToken