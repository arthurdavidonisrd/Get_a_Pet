const User = require('../models/User')
const createUserToken = require('../helpers/create-user-token')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getUserByToken = require('../helpers/get-user-by-token')
const getToken = require('../helpers/get-token')
const { decode } = require('jsonwebtoken')

module.exports = class UserController {
    static async register(req, res){
       const {name,email, password, image, phone, confirmpassword} = req.body

       //validacoes
       if(!name){
        res.status(422).json({message: "Nome é obrigatório"})
        return;
       }

       if(!email){
         res.status(422).json({message: "Email é obrigatório"})
         return;
       }

       if(!password){
         res.status(422).json({message: "Senha é obrigatória"})
         return;
       }

       if(!confirmpassword){
         res.status(422).json({message: "Confirmação de senha é obrigatória"})
         return;
       }

       if(!phone){
         res.status(422).json({message: "Telefone é obrigatório"})
         return;
       }

       if(password !== confirmpassword){
        res.status(422).json({message: "As senhas não batem!"})
       }


       const userExists = await User.findOne({email : email})
       if(userExists){
        res.status(422).json({message: "Email já cadastrado"})
        return;
       }


       const salt = await bcrypt.genSalt(15)
       const hashedPassword = await bcrypt.hash(password, salt)

       //creating a user
       const user = new User({
        name: name,
        email: email,
        password: hashedPassword,
        phone: phone
       })

       try{
        
        const newUser = await user.save()
        
        await createUserToken(newUser, req, res)

       }catch(err){
        res.status(500).json({message: err})
        
       }

    }


    static async login(req, res){
      const {email, password} = req.body

      if(!email){
        res.status(422).json({message: "Email é obrigatório"})
        return;
      }
      
      if(!password){
        res.status(422).json({message: "Senha é obrigatória"})
        return;
      }

      const user = await User.findOne({email : email})
      if(!user){
        res.status(422).json({message : "O e-mail inserido não existe!"})
        return;
      }

      //check if password match with the hashed password in DB
      const checkPassword = await bcrypt.compare(password, user.password)

      if(!checkPassword){
        res.status(422).json({message: "Senha inválida!"})
        return;
      }

      await createUserToken(user, req, res);


    }


    static async checkUser(req, res) {
      let currentUser; 
    
      if (req.headers.authorization) {
        const token = getToken(req);
    
        if (!token) {
          return res.status(401).send({ error: 'Token não fornecido!' });
        }
    
        try {
          const decoded = jwt.verify(token, 'nossosecretkey');
          currentUser = await User.findById(decoded.id);
        } catch (error) {
          return res.status(401).send({ error: 'Token inválido!' });
        }


      } else {
        currentUser = null;
      }
    
      res.status(200).send(currentUser);
    }

    static async getUserById(req, res){
      const id = req.params.id

      const user = await User.findById(id).select("-password")

      if(!user){
        res.status(422).json({message: "Usuário não encontrado!"})
        return;
      }

      res.status(200).json({user})

    }

    static async editUser(req, res){
      const id = req.params.id
      
      const token = getToken(req)
      const user = await getUserByToken(token)

      const {name, email, phone, password, confirmpassword} = req.body

      let image = ''

      if(req.file){
        user.image = req.file.filename
      }


      if(!name){
        res.status(422).json({message: "Nome é obrigatório"})
        return;
       }

       user.name = name

       if(!email){
         res.status(422).json({message: "Email é obrigatório"})
         return;
       }

       const userExist = await User.findOne({email: email})

       if(user.email !== email && userExist){
        res.status(422).json({message: "Email ja em uso!"})
        return;

       }

       user.email = email


       if(!phone){
         res.status(422).json({message: "Telefone é obrigatório"})
         return;
       }

       user.phone = phone

       if(password !== confirmpassword){
        res.status(422).json({message: "As senhas não batem!"})
        return;
       }else if(password === confirmpassword && password.trim()){

        const salt = await bcrypt.genSalt(15);
        const passwordHashed = await bcrypt.hash(password, salt);
        user.password = passwordHashed;

      }

       try{
        await User.findOneAndUpdate(
          {_id: user.id},
          {$set: user},
          {new: true}
        )

        res.status(200).json({message: "Usuário atualizado com sucesso!"})

       }catch(err){
        res.status(500).json({message: `O erro é: ${err}`})
        return
       }



    }
    
}