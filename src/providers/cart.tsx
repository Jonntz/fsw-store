"use client"

import { Product } from "@prisma/client";
import { ReactNode, createContext, useState } from "react";

interface CartProduct extends Product {
    quantity: number
}


interface ICartContext{
    products: CartProduct[]
    cartTotalPrice: number
    cartBasePrice: number
    totalDiscount: number
    addProductToCart: (product: CartProduct) => void
}

export const CartContext = createContext<ICartContext>({
    products: [],
    cartBasePrice: 0,
    cartTotalPrice: 0,
    totalDiscount: 0,
    addProductToCart: () => {}
})

const CartProvider = ({children}: {children: ReactNode}) => {
    const [products, setProducts] = useState<CartProduct[]>([])

    const addProductToCart = (product: CartProduct) => {
        setProducts((prev) => [...prev, product])
    }

    return ( 
        <CartContext.Provider value={{
            products,
            addProductToCart,
            cartBasePrice: 0,
            cartTotalPrice: 0,
            totalDiscount: 0
        }}>
            {children}
        </CartContext.Provider>
     );
}
 
export default CartProvider;