const router = require('express').Router();
const Auth = require("../Controllers/Auth");
const productController= require("../Controllers/ProductController")
const producerController= require("../Controllers/ProducerController");
const upload = require('../Middlewares/multerConfig');
//const imageController = require("../Controllers/imageController")


//Authentication with JWT
router.post("/signup", Auth.signUp) ;
router.post("/signin", Auth.signIn);

// Products routes 

// Route pour créer un produit
router.post('/new-product', upload.fields([{ name: "imageProduct" , maxCount: 1 }, 
{ name: "imageProducer", maxCount: 1 }]), productController.createProduct);
// Route pour lire tous les produits
router.get('/all-products', productController.getAllProducts);
// Route pour lire un produit par ID
router.get('/show-product/:id', productController.getProductById);
// Route pour mettre à jour un produit par ID
router.put('/update-product/:productId', productController.updateProduct);
// Route pour supprimer un produit par ID
router.delete('/delete-product/:id', productController.deleteProduct);
//router.get('/productType', productController.getProductType);

// Producers routes 

// Route pour créer un producteur
router.post('/new-producer' , upload.fields([{ name: "imageProducer" , maxCount: 13 }, 
{ name: "imageProduct", maxCount: 13 }]) , producerController.createProducer);
// Route pour lire tous les produits
router.get('/all-producers', producerController.getAllProducers);
// Route pour lire un produit par ID
router.get('/show-producer/:id', producerController.getProducerById);
// Route pour mettre à jour un produit par ID
router.put('/update-producer/:producerId', producerController.updateProducer);
// Route pour supprimer un produit par ID
router.delete('/delete-producer/:id', producerController.deleteProducer);


// router.get('/get-image/:id', imageController.getImage);
// router.get('/getImages',imageController.getImage );
// router.get('/getImage/:id', imageController.getSpecificImage);
module.exports = router;