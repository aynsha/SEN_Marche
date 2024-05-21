
import { createSlice } from "@reduxjs/toolkit";

const PanierReducer = createSlice({
    name: "panier",
    initialState: {
        items: [],
        isCartVisible: false,
    },
    reducers:{
        toogleCartView(state){
            state.isCartVisible = !state.isCartVisible;
        },
        addItemCart(state, action){
            const newProduct = action.payload;
            const existingProductIndex = state.items.findIndex(
                (item) => item._id === newProduct._id
            );
            
            if(existingProductIndex !== -1) {
                state.items[existingProductIndex].productQuantity++;
            } else {
                const existingProduct = state.items.find(
                    (item) => item.producerName === newProduct.producerName
                );

                if(existingProduct) {
                    state.items.push({
                        _id: newProduct._id,
                        imageProduct: newProduct.imageProduct,
                        productName: newProduct.productName,
                        productPrice: newProduct.productPrice,
                        productQuantity: 1,
                    });
                // } else if(!existingProduct){
                //    state.items.push({
                //     _id: newProduct._id,
                //     imageProducer: newProduct.imageProducer,
                //     producerName: newProduct.producerName,
                //     email: newProduct.email,
                //     password: newProduct.password,
                //     phoneNumber: newProduct.phoneNumber,
                //     address: {...newProduct.address},
                //     product: Array.isArray(newProduct.product) ? newProduct.map(p => ({
                //         productName: p.productName,
                //         imageProduct: p.imageProduct,
                //         quantity: p.quantity,
                //         isAvailable: p.isAvailable
                //     })) : []
                //    })
                } 
                else  {
                    state.items.push({
                        _id: newProduct._id,
                        imageProduct: newProduct.imageProduct,
                        productName: newProduct.productName,
                        producerName: newProduct.producer.producerName,
                        imageProducer: newProduct.producer.imageProducer,
                        productPrice: newProduct.productPrice,
                        productQuantity: 1,
                        product: Array.isArray(newProduct.product) ? newProduct.map(p => ({
                                    productName: p.productName,
                                    imageProduct: p.imageProduct,
                                    quantity: p.quantity,
                                    isAvailable: p.isAvailable
                                })) : []
                    });
                }
            }
        },
        removeItemCart(state, action) {
            state.items= state.items.filter((item)=>item._id !== action.payload)
        }
    }
});

export const panierAction = PanierReducer.actions;

export default PanierReducer;


