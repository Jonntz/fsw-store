import { db } from "@/lib/prisma";

interface ProductDetailsPageProps {
    params:{
        slug: string
    }
}

const ProductDetailsPage = async ({params: {slug}}: ProductDetailsPageProps) => {
    const product = await db.product.findFirst({
        where:{
            slug: slug
        }
    })

    if (!product) return null
    
    return ( <h1> {product?.name} </h1> );
}
 
export default ProductDetailsPage;