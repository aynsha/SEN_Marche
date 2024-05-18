// const Image = require('../Models/Image');
// const path= require('path');
// const fs= require ('fs');
// const { useState } = require('react');

// exports.uploadImage = async (req, res) => {
//     try {
//         const newImage = await Image.create({ image: req.file.filename });
//         return res.json({ message: 'Successfully uploaded', newImage });
//     } catch (err) {
//         console.error(err);
//         res.status(400).send("Error while saving the image to database");
//     }
// };

// exports.getImage = async (req, res) => {
//     try {
//         const media = await Image.find();
//         if (!media || media.length === 0) {
//             return res.status(404).send("No images found");
//         }
//         // Convertir les images en base64 et les renvoyer
//         const base64Images = await Promise.all(media.map((image) => {
//             const imagePath = path.join(__dirname, '..', 'Uploads', image.image);
//             const imageBuffer = fs.readFileSync(imagePath);
//             const base64Image = imageBuffer.toString('base64');
//             return base64Image;
//         }));
//         return res.json(base64Images);
//     } catch (error) {
//         console.error(error);
//         return res.status(500).send("Internal server error");
//     }
// };
// exports.getSpecificImage = async (req, res) => {
//     try {
//         const imageId = req.params.imageId; // Supposons que l'ID de l'image soit passé en tant que paramètre dans l'URL
        
//         // Recherche de l'image par ID dans la base de données
//         const image = await Image.findById(imageId);
        
//         if (!image) {
//             return res.status(404).send("Image not found");
//         }

//         // Récupération du chemin de l'image
//         const imagePath = path.join(__dirname, '..', 'Uploads', image.image);

//         // Lecture du fichier de l'image
//         const imageBuffer = fs.readFileSync(imagePath);

//         // Conversion de l'image en base64
//         const base64Image = imageBuffer.toString('base64');

//         // Renvoi de l'image en tant que réponse
//         return res.json({ base64Image });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).send("Internal server error");
//     }
// };




