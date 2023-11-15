import ProductItem from "@/components/ui/product-item";
import { computeTotalPrice } from "@/helpers/product";
import { Product } from "@prisma/client";

interface ProductListProps {
    products: Product[]
}

const ProductList = ({ products }: ProductListProps) => {
    return <div className="flex w-full gap-4 overflow-x-auto p-5 [&::-webkit-scrollbar]:hidden">
        {products.map(product => (
            <div key= {product.id} className="w-[156px] lg:w-[200px] lg:min-w-[200px]">
                <ProductItem  product={computeTotalPrice(product)} />
            </div>
        ))}
    </div>
}
 
export default ProductList;