import {  ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";

const Cart = () => {
    const {products} = useContext(CartContext)

    return ( 
        <div>
            <Badge className="gap-1 w-fit text-base uppercase border-primary border-2 px-3 py-[0.375rem]" variant="outline">
                <ShoppingCartIcon size={16}/> Carrinho
            </Badge>

            {products.map(product => <h1 key={product.id}> {product.name} </h1>)}
        </div>
     );
}
 
export default Cart;