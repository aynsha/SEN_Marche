const mongoose= require('mongoose');

const productShema= new mongoose( {
    name : {
        type : String,
        require : true
    },
    type : {
        type : String,
        require : true
    },
    price : {
        type : Number,  
        // require : true,
    },

},
{timestamps:true})
module.exports= mongoose.model('Products', productShema)