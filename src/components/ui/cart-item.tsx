import { CartContext, CartProduct } from "@/providers/cart";
import Image from "next/image";
import { Button } from "./button";
import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
    product: CartProduct
}

const CartItem = ({product}: CartItemProps) => {
    const { decreaseProductQuantity, increaseProductQuantity, removeProductsFromCart } = useContext(CartContext)

    const handleDecreaseProductQuantityClick = () => {
        decreaseProductQuantity(product.id)
    }

    const handleIncreaseProductQuantityClick = () => {
        increaseProductQuantity(product.id)
    }

    const handleRemoveProductsFromCart = () => {
        removeProductsFromCart(product.id)
    }

    return ( 
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                {/* Foto e info */}

                <div className="bg-accent flex items-center rounded-lg justify-center h-[77px] w-[77px] lg:h-[120px] lg:w-[120px]">
                    <Image 
                        src={product.imageUrls[0]}
                        alt={product.name}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-auto h-auto max-w-[80%] max-h-[70%]"
                    />
                </div>

                <div className="flex flex-col gap-1 lg:gap-2">
                    <p className="text-xs lg:text-sm"> {product.name} </p>

                    <div className="flex items-center gap-2">
                        <p className="font-bold text-sm lg:text-base">R$ {product.totalPrice.toFixed(2)} </p>
                        
                        {product.discountPercentage > 0 && (
                            <p className="opacity-75 line-through text-xs lg:text-sm">
                                R$ {Number(product.basePrice).toFixed(2)} 
                            </p>
                        )}
                    </div>

                    <div className="flex items-center gap-1 mt-2 lg:gap-3">
                        <Button onClick={handleDecreaseProductQuantityClick} size="icon" variant="outline" className="w-8 h-8 lg:h-9 lg:w-9">
                            <ArrowLeftIcon className="h-4 w-4 lg:h-5 lg:w-5" />
                        </Button>

                        <span className="text-xs lg:text-sm"> {product.quantity} </span>

                        <Button onClick={handleIncreaseProductQuantityClick} size="icon" variant="outline" className="w-8 h-8 lg:h-9 lg:w-9">
                            <ArrowRightIcon className="h-4 w-4 lg:h-5 lg:w-5" />
                        </Button>
                    </div>
                </div>
            </div>

            <Button onClick={handleRemoveProductsFromCart} size="icon" variant="outline" className="h-8 w-8 lg:h-9 lg:w-9">
                <TrashIcon className="h-4 w-4 lg:h-5 lg:w-5" />
            </Button>
        </div>
     );
}
 
export default CartItem;