import {configureStore} from '@reduxjs/toolkit';
import PanierReducer from './PanierReducer';
import userReducer from './userReducer';

const store= configureStore({
    reducer:{
        Panier: PanierReducer.reducer,
        user: userReducer,
    },
    
})
export default store;