const Product = require('../Models/ProductsModel');

// Créer un produit
exports.createProduct = async (req, res) => {
    try {
      const { imageProduct, productName, producer,imageProducer, productType, productPrice } = req.body;
  
      // // Vérifier si l'URL d'image du produit existe déjà dans la base de données
      // const existingProduct = await Product.findOne({ imageProduct });
      // if (existingProduct) {
      //   return res.status(400).json({ error: "Cette image de produit existe déjà" });
      // }
      // Constructing the image URL from the image name
      const fileNameProduct = `${imageProduct}`;
      const fileNameProducer = `${imageProducer}`;
      const baseUrl = "http://localhost:5000/uploads/";
      const productImageUrl = baseUrl + fileNameProduct;
      const producerImageUrl = baseUrl + fileNameProducer;
  
      const product = new Product({
        imageProduct: productImageUrl,
        productName,
        producer: {
          producerName: producer.producerName,
          imageProducer: producerImageUrl
        },
        productType,
        productPrice
      });
  
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


// Lire tous les produits oui Récupérer tous les produits
exports.getAllProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Lire un produit par ID
exports.getProductById = async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Mettre à jour un produit par ID
exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.productId; // Récupérer l'ID du produit à mettre à jour depuis les paramètres de la requête
        const { imageProduct, productName, producer, imageProducer, productType, productPrice } = req.body;

        // Vérifier si le produit existe dans la base de données
        const existingProduct = await Product.findById(productId);
        if (!existingProduct) {
            return res.status(404).json({ error: "Le produit à mettre à jour n'existe pas" });
        }

        // Construction de l'URL de l'image du produit
        const fileNameProduct = `${imageProduct}`;
        const fileNameProducer = `${imageProducer}`;
        const baseUrl = "http://localhost:5000/uploads/";
        const productImageUrl = baseUrl + fileNameProduct;
        const producerImageUrl = baseUrl + fileNameProducer;

        // Mettre à jour les propriétés du produit
        existingProduct.imageProduct = productImageUrl;
        existingProduct.productName = productName;
        existingProduct.producer.producerName = producer.producerName;
        existingProduct.producer.imageProducer = producerImageUrl;
        existingProduct.productType = productType;
        existingProduct.productPrice = productPrice;

        // Enregistrer les modifications dans la base de données
        await existingProduct.save();

        res.status(200).json(existingProduct); // Renvoyer le produit mis à jour
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Supprimer un produit par ID
exports.deleteProduct = async (req, res) => {
    try {
      const productId = req.params.id;
      const deletedProduct = await Product.findByIdAndDelete(productId);
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

