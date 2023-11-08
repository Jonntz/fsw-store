"use client"

import { ProductWithTotalPrice } from "@/helpers/product";
import { ReactNode, createContext, useState } from "react";

export interface CartProduct extends ProductWithTotalPrice {
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
        const productsIsAlreadyInCart = products.some(cartProduct => cartProduct.id === product.id)

        if (productsIsAlreadyInCart) {
            setProducts((prev) => 
                prev.map((cartProduct) =>{
                    if (cartProduct.id === product.id) {
                        return {
                            ...cartProduct,
                            quantity: cartProduct.quantity + product.quantity
                        }
                    }

                    return cartProduct
                })
            )

            return
        }

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