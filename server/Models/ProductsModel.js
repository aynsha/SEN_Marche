const mongoose= require('mongoose');

const productShema= new mongoose.Schema( {
    productName : {
        type : String,
        require : true
    },
    producerName : 
        {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Producers'
         type: String,
         require: true
       },
    productType : {
        type : String,
        require : true
    },
    productPrice : {
        type : Number,  
        // require : true,
    },

},
{timestamps:true}
)
module.exports= mongoose.model('Products', productShema)