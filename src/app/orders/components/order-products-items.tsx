import { computeTotalPrice } from "@/helpers/product";
import { OrderProduct, Prisma } from "@prisma/client";
import Image from "next/image"

interface OrderProductItemsProps {
    orderProduct: Prisma.OrderProductGetPayload<{
        include:{
            product:true
        }
    }>
}

const OrderProductItems = ({orderProduct}: OrderProductItemsProps) => {
    const productWithTotalPrice = computeTotalPrice(orderProduct.product)

    return ( 
        <div className="relative flex w-full items-center gap-4">
            <div className="bg-accent rounded-lg w-[100px] h-[77px] flex items-center lg:h-[130px] lg:w-[150px]">
                <Image 
                    src={orderProduct.product.imageUrls[0]} 
                    alt={orderProduct.product.name}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-auto w-auto max-h-[80%] max-w-[80%] object-contain mx-auto my-auto" 
                />
            </div>

            <div className="flex flex-col gap-1 w-full lg:gap-2">
                <div className="flex bg-accent px-3 py-1 rounded-md w-fit">
                    <p className="text-[10px] lg:text-xs">Vendido e entregue por 
                        <span className="font-bold"> FSW Store</span>
                    </p>
                </div>

                <p className="text-xs lg:text-sm">{orderProduct.product.name}</p>

                <div className="flex items-center gap-1 justify-between w-full">
                    <div className="bottom-0 flex items-center justify-center gap-1 text-right lg:absolute lg:right-0 lg:top-0 lg:my-auto lg:flex-col lg:items-end">
                        <p className="text-sm font-bold lg:text-xl">R$ {productWithTotalPrice.totalPrice.toFixed(2)}</p>

                        {productWithTotalPrice.discountPercentage > 0 && (
                            <p className="opacity-60 line-through text-xs lg:text-sm">
                                R$ {Number(productWithTotalPrice.basePrice).toFixed(2)}
                            </p>
                        )}
                    </div>

                    <p className="text-xs opacity-60 lg:hidden">
                        Qntd: {orderProduct.quantity}
                    </p>
                    <p className="hidden text-sm opacity-60 lg:block">
                        Quantidade: {orderProduct.quantity}
                    </p>
                </div>
            </div>
        </div>
     );
}
 
export default OrderProductItems;