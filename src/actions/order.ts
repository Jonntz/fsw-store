"use server"

import { db } from "@/lib/prisma";
import { CartProduct } from "@/providers/cart";

export const createOrder = async (cartProducts: CartProduct[], userId: string) => {
    const order = await db.order.create({
        data: {
            userId,
            status: 'WAITING_FOR_PAYMENT',
            orderProduct: {
                createMany: {
                    data: cartProducts.map((product) => ({
                        basePrice: product.basePrice,
                        discountPercentage: product.discountPercentage,
                        productId: product.id,
                        quantity: product.quantity
                    }))
                }
            }
        }
    })

    return order
}