const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  image: String // Stockage de l'URL de l'image
},
{timestamps:true}
);

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;