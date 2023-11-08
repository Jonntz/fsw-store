import { CartContext, CartProduct } from "@/providers/cart";
import Image from "next/image";
import { Button } from "./button";
import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
    product: CartProduct
}

const CartItem = ({product}: CartItemProps) => {
    const { decreaseProductQuantity } = useContext(CartContext)

    const handleDecreaseProductQuantityClick = () => {
        decreaseProductQuantity(product.id)
    }

    return ( 
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                {/* Foto e info */}

                <div className="bg-accent flex items-center rounded-lg justify-center h-[77px] w-[77px]">
                    <Image 
                        src={product.imageUrls[0]}
                        alt={product.name}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-auto h-auto max-w-[80%] max-h-[70%]"
                    />
                </div>

                <div className="flex flex-col">
                    <p className="text-xs"> {product.name} </p>

                    <div className="flex items-center gap-2">
                        <p className="font-bold text-sm">R$ {product.totalPrice.toFixed(2)} </p>
                        {product.discountPercentage > 0 && (
                            <p className="opacity-75 line-through text-xs">R$ {Number(product.basePrice).toFixed(2)} </p>
                        )}
                    </div>

                    <div className="flex items-center gap-1 mt-2">
                        <Button onClick={handleDecreaseProductQuantityClick} size="icon" variant="outline" className="w-8 h-8">
                            <ArrowLeftIcon size={16} />
                        </Button>

                        <span className="text-xs"> {product.quantity} </span>

                        <Button size="icon" variant="outline" className="w-8 h-8">
                            <ArrowRightIcon size={16} />
                        </Button>
                    </div>
                </div>
            </div>

            <Button size="icon" variant="outline">
                <TrashIcon size={16} />
            </Button>
        </div>
     );
}
 
export default CartItem;