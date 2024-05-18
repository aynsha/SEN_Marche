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
        const { imageProducer, producerName, email, password, phoneNumber, address, product, imageProduct } = req.body;

        // Vérifier si l'email du producteur existe déjà
        const producerEmailExist = await Producer.findOne({ email });
        if (producerEmailExist) {
            return res.status(409).json({ message: "Un producteur avec cet email existe déjà!" });
        }

        // Crypter le mot de passe
        const salt = await bcrypt.genSalt(10);
        const cryptPassword = await bcrypt.hash(password, salt);

        // Générer les URLs des images
        const baseUrl = "http://localhost:5000/uploads/";
        const producerImageUrl = baseUrl + `${imageProducer}`;
        const productImageUrl= baseUrl + `${imageProduct}`

        // Vérifier et traiter la propriété product
        const products = product && Array.isArray(product) ? product.map(p => ({
            productName: p.productName,
            imageProduct: productImageUrl,
            quantity: p.quantity,
            isAvailable: p.isAvailable
        })) : [];

        // Créer un nouveau producteur
        const producer = new Producer({
            imageProducer: producerImageUrl,
            producerName,
            email,
            password: cryptPassword,
            phoneNumber,
            address,
            product: products
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
        const producerId = req.params.producerId;
        const { imageProducer, producerName, email, password, phoneNumber, address, product, imageProduct } = req.body;
        const producer = await Producer.findById(producerId);
        if (!producer) {
            return res.status(404).json({ message: 'Producteur non trouvé' });
        }

        // Générer les URLs des images
        const baseUrl = "http://localhost:5000/uploads/";
        const producerImageUrl = baseUrl + `${imageProducer}`;
        const productImageUrl= baseUrl + `${imageProduct}`;

        // Vérifier et traiter la propriété product
        const products = product && Array.isArray(product) ? product.map(p => ({
            productName: p.productName,
            imageProduct: productImageUrl,
            quantity: p.quantity,
            isAvailable: p.isAvailable
        })) : [];

        // Hacher le mot de passe si modifié
        if (password && password !== producer.password) {
            const salt = await bcrypt.genSalt(10);
            producer.password = await bcrypt.hash(password, salt);
        }

        // Mettre à jour les autres propriétés
        producer.imageProducer = producerImageUrl;
        producer.producerName = producerName;
        producer.email = email;
        producer.phoneNumber = phoneNumber;
        producer.address = address;
        producer.product = products;

        await producer.save();
        res.status(200).json(producer);
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
