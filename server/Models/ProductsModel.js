const mongoose= require('mongoose');

const productShema= new mongoose.Schema( {
    imageProduct:{
        type: String,
        require: true
    },
    productName : {
        type : String,
        require : true
    },
    producer : 
        {
        producerName:{type: String, require: true},
        imageProducer:{type: String, require: true}
       },
    productType : {
        type : String,
        require : true
    },
    productPrice : {
        type : Number,  
        require : true,
    },

},
{timestamps:true}
)
module.exports= mongoose.model('Products', productShema)