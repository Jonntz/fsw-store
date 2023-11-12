import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Prisma } from "@prisma/client";
import {format} from "date-fns"
import OrderProductItems from "./order-products-items";

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

const OrderItem = ({order}: orderItemsProps) => (
    <Card className="px-5">
        <Accordion type="single" className="w-full" collapsible>
            <AccordionItem value={order.id}>
                <AccordionTrigger>
                    <div className="flex flex-col gap-1 text-left">
                        Pedido com {order.orderProduct.length} produto(s)
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between p-2">
                            <div className="font-bold ">
                                <p>Status</p>
                                <p className="text-[#8162FF]">{order.status}</p>
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
                    </div>
                </AccordionContent>
            </AccordionItem>

        </Accordion>
    </Card>
)
 
export default OrderItem;