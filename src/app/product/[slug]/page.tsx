import { db } from "@/lib/prisma";
import ProductImages from "./components/product-images";
import ProductInfo from "./components/product-info";
import { computeTotalPrice } from "@/helpers/product";
import ProductList from "@/components/ui/product-list";

interface ProductDetailsPageProps {
    params:{
        slug: string
    }
}

const ProductDetailsPage = async ({params: {slug}}: ProductDetailsPageProps) => {
    const product = await db.product.findFirst({
        where:{
            slug: slug
        },

        include:{
            category: {
                include: {
                    products: {
                        where:{
                            slug:{
                                not: slug
                            }
                        }
                    }
                }
            }
        }
    })

    if (!product) return null
    
    return <div className="flex flex-col gap-8 mb-6 pb-8">
        <ProductImages imageUrls={product.imageUrls} name={product.name}/>
        <ProductInfo product={computeTotalPrice(product)}/>

        <ProductList products={product.category.products} />
    </div> ;
}
 
export default ProductDetailsPage;