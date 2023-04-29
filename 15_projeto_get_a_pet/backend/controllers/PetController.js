const Pet = require("../models/Pet")

// helpers
const getToken = require("../helpers/get-token")
const userByToken = require("../helpers/get-user-by-token")
const getUserByToken = require("../helpers/get-user-by-token")
const ObjectId = require("mongoose").Types.ObjectId

module.exports = class PetController {

    static async allPets(req, res) {

        // ordenando pelos mais novos
        const pets = await Pet.find().sort("-createdAt")

        return res.status(200).json({pets})
    }

    static async getUserPets(req, res) {
        // resgatando dono
        const token = getToken(req)
        const user = await getUserByToken(token)

        const pets = await Pet.find({"user._id": user._id}).sort("-createdAt")

        return res.status(200).json({ pets })
    }

    static async getUserAdoptions(req, res) {
        // resgatando dono
        const token = getToken(req)
        const user = await getUserByToken(token)

        const pets = await Pet.find({"adopter._id": user._id}).sort("-createdAt")

        return res.status(200).json({ pets })
    }

    static async getPetById(req, res) {

        const {id} = req.params

        if(!ObjectId.isValid(id)) {
            return res.status(422).json({message: "ID inválido!"})
        }
        
        const pet = await Pet.findOne({ _id: id })

        if(!pet) {
            return res.status(404).json({message: "Pet não encontrado!"})
        }

        return res.status(200).json({pet})

    }

    static async create(req, res) {
        const {name, age, weight, color} = req.body
        
        const images = req.files

        const available = true

        //  validações
        if(!name) {
            return res.status(422).json({message: "O nome é obrigatório!"})
        }
        
        if(!age) {
            return res.status(422).json({message: "A idade é obrigatória!"})
        }

        if(!weight) {
            return res.status(422).json({message: "O peso é obrigatório!"})
        }

        if(!color) {
            return res.status(422).json({message: "A cor é obrigatória!"})
        }

        if(!images || images.length === 0) {
            return res.status(422).json({message: "Envie ao menos uma imagem!"})
        }

        // resgatando dono
        const token = getToken(req)
        const user = await getUserByToken(token)       


        // criando o pet
        const pet = new Pet({
            name,
            age,
            weight,
            color,
            available,
            images: [],
            user: {
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone
            }
        })
        // adicionando imagens ao pet
        images.map((img) => {
            pet.images.push(img.filename)
        })

        try {
            const newPet = await pet.save()
            return res.status(201).json({message: "Pet cadastrado!"})
        } catch (error) {
            return res.status(500).json({message: error})
        }
    }

    static async deletePet(req, res) {

        const {id} = req.params

        if(!ObjectId.isValid(id)) {
            return res.status(422).json({message: "ID inválido!"})
        }

        // buscando pet
        const pet = await Pet.findOne({_id: id})
        if(!pet) {
            return res.status(404).json({message: "Pet não encontrado!"})
        }

        // checando se está logado
        const token = getToken(req)
        const user = await getUserByToken(token)

        if(pet.user._id.toString() !== user._id.toString()) {
            return res.status(422).json({message: "Houve um problema em processar a sua solicitação. Tente novamente mais tarde."})
        }

        try {
            await Pet.findByIdAndRemove(id)
            res.status(200).json({message: "Pet removido com sucesso!"})
        } catch (error) {
            return res.status(500).json({message: "Não foi possível deletar o pet. Tente novamente mais tarde."})
        }
    }

    static async updatePet(req, res) {

        const {id} = req.params

        const {name, age, weight, color, available} = req.body

        const images = req.files

        const updatedData = {}

        // validando se pet existe
        const pet = await Pet.findOne({_id: id})
        if(!pet) {
            return res.status(404).json({message: "Pet não encontrado!"})
        }

        // checando se está logado
        const token = getToken(req)
        const user = await getUserByToken(token)

        if(pet.user._id.toString() !== user._id.toString()) {
            return res.status(422).json({message: "Houve um problema em processar a sua solicitação. Tente novamente mais tarde."})
        }


        //  validações
        if(!name) {
            return res.status(422).json({message: "O nome é obrigatório!"})
        } else {
            updatedData.name = name
        }
        
        if(!age) {
            return res.status(422).json({message: "A idade é obrigatória!"})
        } else {
            updatedData.age = age
        }

        if(!weight) {
            return res.status(422).json({message: "O peso é obrigatório!"})
        } else {
            updatedData.weight = weight
        }

        if(!color) {
            return res.status(422).json({message: "A cor é obrigatória!"})
        } else {
            updatedData.color = color
        }

        if(!images || images.length === 0) {
            return res.status(422).json({message: "Envie ao menos uma imagem!"})
        } else {
            updatedData.images = []
            images.map((img) => {
                updatedData.images.push(img.filename)
            })
        }

        try {
            await Pet.findByIdAndUpdate(id, updatedData)
            return res.status(200).json({message: "Pet atualizado com sucesso."})
        } catch (error) {
            return res.status(500).json({message: "Não foi possível atualizar o pet. Tente novamente mais tarde."})
        }
    }

    static async schedule(req, res) {

        const {id} = req.params

        // validando se pet existe
        const pet = await Pet.findOne({_id: id})
        if(!pet) {
            return res.status(404).json({message: "Pet não encontrado!"})
        }

        // checando se usuário é dono do pet
        const token = getToken(req)
        const user = await getUserByToken(token)

        if(pet.user._id.equals(user._id)) {
            return res.status(422).json({message: "Você não pode agendar uma visita com seu próprio pet!"})
        }

        // checando se o já foi agendada uma visita
        if(pet.adopter) {
            if(pet.adopter._id.equals(user._id)) {
                return res.status(422).json({message: "Você já agendou uma visita para este pet!"})
            }
        }

        // adicionando usuário ao pet
        pet.adopter = {
            _id: user._id,
            name: user.name,
            image: user.image
        }

        const arrayPhone = user.phone.split("")
        const ddd = arrayPhone[0] + arrayPhone[1]
        let number = ""
        for (let i = 2; i < arrayPhone.length; i++) {
            number += arrayPhone[i]
        }
    
        try {
            await Pet.findByIdAndUpdate(id, pet)
            return res.status(200).json({message: `A visita foi agendada com sucesso! Entre em contato com ${user.name} pelo número (${ddd})${number}`})
        } catch (error) {
            return res.status(500).json({message: "Ocorreu um erro. Tente novamente mais tarde."})
        }
    }

    static async conclude(req, res) {

        const {id} = req.params

        // validando se pet existe
        const pet = await Pet.findOne({_id: id})
        if(!pet) {
            return res.status(404).json({message: "Pet não encontrado!"})
        }

        // checando se usuario logado registrou o pet
        const token = getToken(req)
        const user = await getUserByToken(token)

        if(pet.user._id.toString() !== user._id.toString()) {
            return res.status(422).json({message: "Houve um problema em processar a sua solicitação. Tente novamente mais tarde."})
        }

        pet.available = false
        
        try {
            await Pet.findByIdAndUpdate(id, pet)
            return res.status(200).json({message: "Parabéns! O ciclo de adoção foi finalizado com sucesso!"})
        } catch (error) {
            return res.status(500).json({message: "Ocorreu um erro. Tente novamente mais tarde."})
        }
    }
}