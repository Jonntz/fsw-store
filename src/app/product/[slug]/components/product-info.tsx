"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DiscountBadge from "@/components/ui/discount-badge";
import { ProductWithTotalPrice } from "@/helpers/product";
import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, TruckIcon } from "lucide-react";
import { useState } from "react";


interface ProductInfoProps{
    product: Pick<
        ProductWithTotalPrice,
        "basePrice" | "description" | "discountPercentage" | "totalPrice" | "name" >
}

const ProductInfo = ({
    product: {basePrice,description,discountPercentage, totalPrice, name}
}: ProductInfoProps) => {
    const [quantity, setQuantity] = useState(1)

    const handleDecreaseQuantityClick = () =>{
        setQuantity((prev) => (prev === 1 ? prev : prev - 1))
    }

    const handleIncreaseQuantityClick = () =>{
        setQuantity((prev) => prev + 1)
    }


    return ( 
        <div className="flex flex-col px-5">
            <h2 className="text-lg"> {name} </h2>

            <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold">R$ {totalPrice.toFixed(2)}</h1>
                {discountPercentage > 0 && (
                    <DiscountBadge>
                        {discountPercentage}
                    </DiscountBadge>
                )}
            </div>
            

            {discountPercentage > 0 && (
                <p className="opacity-75 text-xs line-through">R$ {Number(basePrice).toFixed(2)} </p>
            )}

            <div className="flex items-center gap-2 mt-4">
                <Button size="icon" variant="outline" onClick={handleDecreaseQuantityClick}>
                    <ArrowLeftIcon size={16} />
                </Button>

                <span> {quantity} </span>

                <Button size="icon" variant="outline" onClick={handleIncreaseQuantityClick}>
                    <ArrowRightIcon size={16} />
                </Button>
            </div>

            <div className="flex flex-col gap-3 mt-8">
                <h3 className="font-bold">Descrição</h3>
                <p className="text-sm opacity-60 text-justify"> {description} </p>
            </div>

            <Button className="mt-8 uppercase font-bold">
                Adicionar ao carrinho!
            </Button>

            <div className="bg-accent flex items-center px-5 py-2 justify-between mt-5 rounded-lg">
                <div className="flex items-center gap-2">
                    <TruckIcon />

                    <div className="flex flex-col">
                        <p className="text-xs">Entrega via <span className="text-bold">FSPacket®️</span></p>
                        <p className="text-[#8162FF] text-xs">Envio para <span className="font-bold">todo o Brasil</span></p>
                    </div>
                </div>

                <p className="font-bold text-xs">Frete Grátis</p>
            </div>
        </div>
     );
}
 
export default ProductInfo;