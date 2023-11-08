import {  ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import CartItem from "./cart-item";
import { computeTotalPrice } from "@/helpers/product";
import { Separator } from "./separator";

const Cart = () => {
    const {products, total, subtotal, discountTotal} = useContext(CartContext)

    return ( 
        <div className="flex flex-col gap-8">
            <Badge className="gap-1 w-fit text-base uppercase border-primary border-2 px-3 py-[0.375rem]" variant="outline">
                <ShoppingCartIcon size={16}/> Carrinho
            </Badge>

            <div className="flex flex-col gap-5">
                {products.length > 0 ? (
                    products.map(product => (
                        <CartItem key={product.id} product={computeTotalPrice(product as any) as any} />
                        
                    ))
                ) : (
                    <p className="text-center font-semibold">O Carrinho está vazio</p>
                )}
            </div>

            <div className="flex flex-col gap-3">
                <Separator />

                <div className="flex items-center justify-between text-xs">
                    <p>Subtotal</p>
                    <p>R$ {subtotal.toFixed(2)}</p>
                </div>

                <Separator />

                <div className="flex items-center justify-between text-xs">
                    <p>Entrega</p>
                    <p>GRÁTIS</p>
                </div>

                <Separator />

                <div className="flex items-center justify-between text-xs">
                    <p>Descontos</p>
                    <p>R$ {discountTotal.toFixed(2)}</p>
                </div>

                <Separator />

                <div className="flex items-center justify-between text-sm font-bold">
                    <p>Total</p>
                    <p>R$ {total.toFixed(2)}</p>
                </div>
            </div>
        </div>
     );
}
 
export default Cart;