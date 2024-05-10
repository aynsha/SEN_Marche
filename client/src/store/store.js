import {configureStore} from '@reduxjs/toolkit';
import PanierReducer from './PanierReducer';

const store= configureStore({
    reducer:{
        Panier: PanierReducer.reducer,
    },
})
export default store;