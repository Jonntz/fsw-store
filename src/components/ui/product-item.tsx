import { ProductWithTotalPrice } from "@/helpers/product";
import Image from 'next/image'
import Link from "next/link";
import DiscountBadge from "./discount-badge";

interface ProductItemProps {
    product: ProductWithTotalPrice
}

const ProductItem = ({ product }: ProductItemProps) => {
    return (
        <Link href={`/product/${product.slug}`}>
            <div className="flex flex-col gap-4 ">
                <div className="relative bg-accent rounded-lg h-[170px] w-full flex justify-center items-center lg:h-[200px]">
                    <Image 
                        src={product.imageUrls[0]} 
                        height={0} width={0} 
                        sizes="100vw"
                        className="h-auto w-auto max-h-[70%] max-w-[80%]"
                        style={{
                            objectFit: "contain",
                        }}
                        alt={product.name}
                    />

                    {product.discountPercentage > 0 && (
                        <DiscountBadge className="absolute left-3 top-3"> 
                            {product.discountPercentage}
                        </DiscountBadge>
                    )}
                </div>
                        

                <div>
                    <p className="text-sm overflow-hidden whitespace-nowrap text-ellipsis"> 
                        {product.name} 
                    </p>
                    
                    <div className="flex items-center gap-2 ">
                        {product.discountPercentage > 0 ? (
                            <>
                                <p className="font-semibold overflow-hidden whitespace-nowrap text-ellipsis"> 
                                    R$ {Number(product.totalPrice).toFixed(2) } 
                                </p>
                                
                                <p className="opacity-75 line-through text-xs overflow-hidden whitespace-nowrap text-ellipsis"> 
                                    R$ {Number(product.basePrice).toFixed(2) } 
                                </p>
                            </>
                        ) : (
                            <p className="opacity-75 line-through text-xs overflow-hidden whitespace-nowrap text-ellipsis"> 
                                R$ {Number(product.basePrice).toFixed(2) } 
                            </p>
                        )}

                    </div>
                </div>
            </div>
        </Link>
    );
}
 
export default ProductItem;