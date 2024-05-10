const Producer = require('../Models/Producers');
// const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

// function to generate a token
// const createToken = (id, email) => {
//     return jwt.sign(
//         { data: { id, email} },
//         process.env.JWT_KEY,
//         { expiresIn: "1d" }
//     )
// }
// Créer un nouveau producteur
exports.createProducer = async (req, res) => {
    try {
        const { producerName, email, password, phoneNumber , address, productName } = req.body;

        // Before creating a new user, we verify if this user already exists or not!!!

        const producerEmailExist = await Producer.findOne({ email });
        if (producerEmailExist) {
            return res.status(409).json({ message: "Producer with this email is already Exist!" });
        }
        // crypt password
        const salt = await bcrypt.genSalt(10);
        const cryptPassword = await bcrypt.hash(password, salt);

        //Création d'un producteur
        const producer = new Producer({
            producerName, 
            email, 
            password: cryptPassword, 
            phoneNumber , 
            address,
            productName,
        });
        await producer.save();
        res.status(201).json(producer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Obtenir tous les producteurs
exports.getAllProducers = async (req, res) => {
    try {
        const producers = await Producer.find();
        res.json(producers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Obtenir un producteur spécifique par son ID
exports.getProducerById = async (req, res) => {
    try {
        const producer = await Producer.findById(req.params.id);
        if (!producer) {
            return res.status(404).json({ message: 'Producteur non trouvé' });
        }
        res.json(producer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Mettre à jour un producteur
exports.updateProducer = async (req, res) => {
    try {
        const producer = await Producer.findById(req.params.id);
        if (!producer) {
            return res.status(404).json({ message: 'Producteur non trouvé' });
        }
        Object.assign(producer, req.body);
        await producer.save();
        res.json(producer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Supprimer un producteur
exports.deleteProducer = async (req, res) => {
    try {
        const producer = await Producer.findById(req.params.id);
        if (!producer) {
            return res.status(404).json({ message: 'Producteur non trouvé' });
        }
        await producer.deleteOne();
        res.json({ message: 'Producteur supprimé avec succès' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
