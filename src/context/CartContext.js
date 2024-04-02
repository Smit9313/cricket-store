import { useReducer, createContext, useContext } from 'react';

const initialState = {
	data: JSON.parse(localStorage.getItem('cartData')) || [],
};

const cartReducer = (state, action) => {
	switch (action.type) {
		case 'ADD':
			const addedProduct = state.data.filter((val) => val.id === action.data.id)
			if (addedProduct.length > 0) {
				const updatedProducts = state.data.map((val) => {
					if (val.id === action.data.id) {
                        return {
                            ...val,
                            quantity: val.quantity + action.qty,
                        };
					} else {
						return val;
					}
				})
				localStorage.setItem('cartData', JSON.stringify(updatedProducts));
				return { ...state, data: updatedProducts };
			} else {
				const newProduct = { ...action.data, quantity: action.qty };
				const updatedData = [...state.data, newProduct];
				localStorage.setItem('cartData', JSON.stringify(updatedData));
				return { ...state, data: updatedData };
			}
		case 'REMOVE':
			const updatedProducts = state.data.filter((val) => val.id !== action.data.id)
			localStorage.setItem('cartData', JSON.stringify(updatedProducts));
			return { ...state, data: updatedProducts };
		default:
			return state;
	}
};

const CartContext = createContext();

const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, initialState);

	const add = (product, qty) => {
		dispatch({ type: 'ADD', data: product, qty });
	};

	const remove = (product) => {
		dispatch({ type: 'REMOVE', data: product });
	};

	return (
		<CartContext.Provider value={{ data: state.data, add, remove }}>
			{children}
		</CartContext.Provider>
	);
};

const useCartContext = () => {
	return useContext(CartContext);
}

export { CartProvider, CartContext, useCartContext };