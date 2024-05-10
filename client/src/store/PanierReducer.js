// import { createSlice } from "@reduxjs/toolkit";

// const PanierReducer = createSlice({
//     name: "panier",
//     initialState: {
//         items: [],
//         isCartVisible: false,
//     },
//     reducers:{
//         toogleCartView(state){
//           state.isCartVisible= !state.isCartVisible;
//         },
//         addItemCart(state, action){
//          const newProduct= action.payload;
//          const existingProductItem = state.items.find(
//           (item)=> item._id===newProduct._id
//       );
//       if(!existingProductItem) {
//       state.items.push({
//           _id: newProduct._id,
//           productName: newProduct.productName,
//           producerName: newProduct.producerName,
//           productPrice: newProduct.productPrice,
//           productQuantity: 1,
//          })
//       }else{
//         existingProductItem.productQuantity++;
//       }
  
//         }  
//       }
// })
// export const panierAction = PanierReducer.actions;

// export default PanierReducer;




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
                        productName: newProduct.productName,
                        productPrice: newProduct.productPrice,
                        productQuantity: 1,
                    });
                } else {
                    state.items.push({
                        _id: newProduct._id,
                        productName: newProduct.productName,
                        producerName: newProduct.producerName,
                        productPrice: newProduct.productPrice,
                        productQuantity: 1,
                    });
                }
            }
        }  
    }
});

export const panierAction = PanierReducer.actions;

export default PanierReducer;


