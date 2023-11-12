import { Badge } from "@/components/ui/badge";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { PackageSearchIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import OrderItem from "./components/order-item";

const OrdersPage =async () => {
    const user = getServerSession(authOptions)

    if (!user) {
        return <p>Acesso Negado</p>
    }

    const orders = await db.order.findMany({
        where: {
            userId: (user as any).id
        },
        include:{
            orderProduct:true
        }
    })

    return ( 
        <div className="p-5">
            <Badge className="gap-1 w-fit text-base uppercase border-primary border-2 px-3 py-[0.375rem]" variant="outline">
                <PackageSearchIcon size={16}/> Meus pedidos
            </Badge>

            <div className="flex flex-col gap-5">
                {orders.map((order) => (
                    <OrderItem key={order.id} order={order} />
                ))}
            </div>
        </div>
     );
}
 
export default OrdersPage;