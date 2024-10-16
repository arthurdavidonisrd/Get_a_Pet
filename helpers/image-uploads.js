const multer = require('multer')
const path = require('path')

const imageStorage = multer.diskStorage({
    destination: function(req, file, cb){
        let folder = ""

        if(req.baseUrl.includes("users")){
            folders = "users"

        }else if(req.baseUrl.includes("pets")){
            folders = "pets"

        }

        cb(null, `public/images/${folders}`)

        
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()+ String(Math.floor(Math.random() * 100)) + path.extname(file.originalname)}`)
    }
})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png|jpg)$/)){
            return cb(new Error("Envie apenas jpg ou png!"))
        }

        cb(undefined, true);
    }
})


module.exports = {imageUpload}