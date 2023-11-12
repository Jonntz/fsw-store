import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Prisma } from "@prisma/client";
import {format} from "date-fns"
import OrderProductItems from "./order-products-items";
import { Separator } from "@/components/ui/separator";
import { useMemo } from "react";
import { computeTotalPrice } from "@/helpers/product";
import { getOrderStatus } from "../helpers/status";

interface orderItemsProps {
    order: Prisma.OrderGetPayload<{
        include: {
            orderProduct: {
                include: {
                    product: true
                }
            }
        }
    }>
}

const OrderItem = ({order}: orderItemsProps) => {
    const subtotal = useMemo(() => {
        return order.orderProduct.reduce((acc, orderProduct) => {
            return acc + Number(orderProduct.product.basePrice) * orderProduct.quantity
        }, 0)
    }, [order.orderProduct])

    const total = useMemo(() => {
        
        return order.orderProduct.reduce((acc, product) => {
            const productWithTotalPrice = computeTotalPrice(product.product)
            return acc + productWithTotalPrice.totalPrice * product.quantity
        }, 0)
    }, [order.orderProduct])

    const totalDiscount = total - subtotal

    return (
        <Card className="px-5">
            <Accordion type="single" className="w-full" collapsible>
                <AccordionItem value={order.id}>
                    <AccordionTrigger>
                        <div className="flex flex-col gap-1 text-left">
                            <p>Pedido com {order.orderProduct.length} produto(s)</p>
                            <span className="text-xs opacity-60">feito em {format(order.createdAt, "dd/mm/yyyy")}</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between p-2">
                                <div className="font-bold ">
                                    <p>Status</p>
                                    <p className="text-[#8162FF]">{getOrderStatus(order.status)}</p>
                                </div>

                                <div>
                                    <p className="font-bold">Data</p>
                                    <p className="opacity-60"> {format(order.createdAt, "dd/mm/yyyy")} </p>
                                </div>

                                <div>
                                    <p className="font-bold">Pagamento</p>
                                    <p className="opacity-60"> Cartão</p>
                                </div>
                            </div>

                            {order.orderProduct.map((orderProduct) => (
                                <OrderProductItems key={orderProduct.id} orderProduct={orderProduct}/>
                            ))}

                            <div className="flex flex-col gap-1 w-full text-xs">
                                <Separator />

                                <div className="flex justify-between w-full py-3">
                                    <p>Subtotal</p>
                                    <p>R$ {subtotal.toFixed(2)}</p>
                                </div>

                                <Separator />

                                <div className="flex justify-between w-full py-3">
                                    <p>Entrega</p>
                                    <p>GRÁTIS</p>
                                </div>

                                <Separator />

                                <div className="flex justify-between w-full py-3">
                                    <p>Descontos</p>
                                    <p>R$ {totalDiscount.toFixed(2)}</p>
                                </div>

                                <Separator />

                                <div className="flex justify-between w-full py-3 text-sm font-bold">
                                    <p>Total</p>
                                    <p>R$ {total.toFixed(2)}</p>
                                </div>


                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

            </Accordion>
        </Card>
    )
}
 
export default OrderItem;