"use client"

import { ProductWithTotalPrice } from "@/helpers/product";
import { ReactNode, createContext, useEffect, useMemo, useState } from "react";

export interface CartProduct extends ProductWithTotalPrice {
    quantity: number
}

interface ICartContext{
    products: CartProduct[],
    cartTotalPrice: number,
    cartBasePrice: number,
    total: number,
    subtotal: number,
    totalDiscount: number,
    discountTotal: number,
    addProductToCart: (product: CartProduct) => void,
    decreaseProductQuantity: (productId: string) => void,
    increaseProductQuantity: (productId: string) => void,
    removeProductsFromCart: (productId: string) => void
}

export const CartContext = createContext<ICartContext>({
    products: [],
    cartBasePrice: 0,
    cartTotalPrice: 0,
    total: 0,
    subtotal: 0,
    totalDiscount: 0,
    discountTotal: 0,
    addProductToCart: () => {},
    decreaseProductQuantity: () => {},
    increaseProductQuantity: () => {},
    removeProductsFromCart: () => {}
})

const CartProvider = ({children}: {children: ReactNode}) => {
    const [products, setProducts] = useState<CartProduct[]>(
        JSON.parse(typeof window !== "undefined" ? localStorage.getItem("@fsw-store/cart-products") || "[]" : "[]")
    )

    useEffect(() => {
        localStorage.setItem("@fsw-store/cart-products", JSON.stringify(products))
    }, [products])

    const subtotal = useMemo(() => {
        return products.reduce((acc, product) => {
            return acc + Number(product.basePrice) * product.quantity
        }, 0)
    }, [products])

    const total = useMemo(() => {
        return products.reduce((acc, product) => {
            return acc + product.totalPrice * product.quantity
        }, 0)
    }, [products])

    const discountTotal = total - subtotal

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

    const decreaseProductQuantity = (productId: string) => {
        setProducts((prev) => prev.map((cartProduct) => {
                if (cartProduct.id === productId) {
                    return {
                        ...cartProduct,
                        quantity: cartProduct.quantity - 1
                    }
                }

                return cartProduct
            }).filter((cartProduct) => cartProduct.quantity > 0)        
        )
    }

    const increaseProductQuantity = (productId: string) => {
        setProducts((prev) => prev.map((cartProduct) => {
                if (cartProduct.id === productId) {
                    return {
                        ...cartProduct,
                        quantity: cartProduct.quantity + 1
                    }
                }

                return cartProduct
            })       
        )
    }

    const removeProductsFromCart = (productId: string) => {
        setProducts(prev => prev.filter((cartProduct) => cartProduct.id !== productId))
    }

    return ( 
        <CartContext.Provider value={{
            products,
            addProductToCart,
            decreaseProductQuantity,
            increaseProductQuantity,
            removeProductsFromCart,
            cartBasePrice: 0,
            cartTotalPrice: 0,
            discountTotal,
            total,
            subtotal,
            totalDiscount: 0

        }}>
            {children}
        </CartContext.Provider>
     );
}
 
export default CartProvider;