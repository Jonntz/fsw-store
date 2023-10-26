import ProductItem from "@/components/ui/product-item";
import { computeTotalPrice } from "@/helpers/product";
import { Product } from "@prisma/client";

interface ProductListProps {
    products: Product[]
}

const ProductList = ({ products }: ProductListProps) => {
    return <div className="flex w-full gap-4 overflow-x-auto p-5 [&::-webkit-scrollbar]:hidden">
        {products.map(product => <ProductItem key= {product.id} product={computeTotalPrice(product)} />)}
    </div>
}
 
export default ProductList;