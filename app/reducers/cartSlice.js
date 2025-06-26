import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [], // Array of cart items
        totalQuantity: 0,
        totalPrice: 0,
    },
    reducers: {
        addToCart: (state, { payload }) => {
            const { id, name, price, unit, image, imageName } = payload;
            const numericPrice = parseFloat(price.replace('$', ''));
            
            const existingItem = state.items.find(item => item.id === id);
            
            if (existingItem) {
                existingItem.quantity += 1;
                existingItem.totalPrice = existingItem.quantity * existingItem.unitPrice;
            } else {
                state.items.push({
                    id,
                    name,
                    price,
                    unit,
                    image,
                    imageName,
                    quantity: 1,
                    unitPrice: numericPrice,
                    totalPrice: numericPrice,
                });
            }
            
            // Update totals
            state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
            state.totalPrice = state.items.reduce((total, item) => total + item.totalPrice, 0);
        },
        
        updateQuantity: (state, { payload }) => {
            const { id, quantity } = payload;
            const item = state.items.find(item => item.id === id);
            
            if (item) {
                if (quantity <= 0) {
                    // Remove item if quantity is 0 or less
                    state.items = state.items.filter(item => item.id !== id);
                } else {
                    item.quantity = quantity;
                    item.totalPrice = item.quantity * item.unitPrice;
                }
                
                // Update totals
                state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
                state.totalPrice = state.items.reduce((total, item) => total + item.totalPrice, 0);
            }
        },
        
        removeFromCart: (state, { payload }) => {
            const { id } = payload;
            state.items = state.items.filter(item => item.id !== id);
            
            // Update totals
            state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
            state.totalPrice = state.items.reduce((total, item) => total + item.totalPrice, 0);
        },
        
        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        },
        
        updateCartInfo: (state, { payload }) => {
            return {
                ...state,
                ...payload,
            };
        },
    },
});

export const { 
    addToCart, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    updateCartInfo 
} = cartSlice.actions;

export default cartSlice.reducer;