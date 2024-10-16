const jwt = require('jsonwebtoken')
const getToken = require('./get-token')

//middleware to validate token
const checkToken = (req, res, next) => {
    const token = getToken(req)

    if(!req.headers.authorization){
        return res.status(401).json({message: "Acesso negado!"})
        return;
    }

    if(!token){
        return res.status(401).json({message: "Acesso negado!"})
        return;
    }


    try{

        const verified = jwt.verify(token, "nossosecretkey")
        req.user = verified
        next()

    }catch(err){
        console.error(err)
        return res.status(400).json({message: "Falha ao validar token!"})
        return;
    }


}


module.exports = checkToken