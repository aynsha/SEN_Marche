const mongoose= require('mongoose');

const producerShema= new mongoose.Schema({
    producerName: { 
        type: String,
        require: true 
    },
    email:{
        type :String ,
        unique :true ,
        require : true 
        } ,
    password :{
            type : String ,
            require : true
            } ,
    phoneNumber : {
                type : Number ,
                require : true
                } ,
    address : {
            addressRue : {type : String} ,
            ville : {type : String} ,
            codePostal : {type : Number}
            } ,
    productName : 
                [{ product : {type : String, require: true},
                quantity : {type : Number , default :1},
                isAvailable : {type : Boolean ,default : true}
                }]
                ,
},
{timestamps:true}
);
module.exports= mongoose.model('Producers', producerShema)