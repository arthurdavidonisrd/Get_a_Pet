const getToken = require('../helpers/get-token');
const Pets = require('../models/Pet')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class petsController {
    static async create(req, res){
        
        const {name, age, weight, color} = req.body
        const petIsAvailable = true;

        const images = req.files

        //images upload


        //validation
        if(!name ||!age ||!weight ||!color){
            return res.status(422).json({message: 'All fields are required'})
        }
        if(images.length  === 0){
            res.status(422).json({message: "A imagem é obrigatória!"})
            return;
        }

        //get pet owner
        const token = getToken(req)
        const user = await getUserByToken(token)

        //Creating a pet
        const petCreatedProps = new Pets({
            name,
            age,
            weight,
            color,
            petIsAvailable,
            images: [],
            user: {
                _id: user.id,
                name: user.name,
                image: user.image,
                phone: user.phone
            }

        })

        images.map((image) => {
            petCreatedProps.images.push({
                filename: image.filename,
                path: image.path
            })
        })

        try{
            const newPetCreated = await petCreatedProps.save()
            res.status(201).json({
                message: 'Pet cadastrado com sucesso!',
                newPetCreated
            })

        }catch(err){
            throw new Error(`O erro é ${err}`)
            return res.status(500).json({message: 'Internal server error'})
        }


    }

    static async getAllPets(req,res){
        const pets = await Pets.find().sort('-createdAt')
        res.status(200).json({pets: pets})

    }


    static async getAllUserPets(req, res) {
        try {
          
            const token = getToken(req);
            const user = await getUserByToken(token);

            if (!user) {
                return res.status(401).json({ message: 'Usuário não encontrado.' });
            }
            const userPets = await Pets.find({ 'user._id': user._id }).sort('-createdAt');

            if (userPets.length === 0) {
                return res.status(404).json({ message: 'Nenhum pet cadastrado para este usuário.' });
            }
            res.status(200).json({ pets: userPets });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar os pets do usuário.', error });
        }
    }


    static async getAllUserAdoptions(req,res){

        try {
          
            const token = getToken(req);
            const user = await getUserByToken(token);

            if (!user) {
                return res.status(401).json({ message: 'Usuário não encontrado.' });
            }
            const userPetsInterstingAdopted = await Pets.find({ 'adopter._id': user._id }).sort('-createdAt');

            if (userPetsInterstingAdopted.length === 0) {
                return res.status(404).json({ message: 'Você ainda não selecionou nenhum pet para adoção.' });
            }
            res.status(200).json({ pets: userPetsInterstingAdopted });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar os pets do usuário.', error });
        }

    }



    
}