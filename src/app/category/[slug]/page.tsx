import { Badge } from "@/components/ui/badge";
import ProductItem from "@/components/ui/product-item";
import { CATEGORY_ICON } from "@/constants/category-items";
import { computeTotalPrice } from "@/helpers/product";
import { db } from "@/lib/prisma";

const CategoryProducts = async ({params}: any) => {

    const category = await db.category.findFirst({
            where:{
                slug: params.slug
            },
            include:{
                products: true
            }
        }
    )

    if (!category) return null
    

    return (
            <div className="mx-auto flex flex-col gap-8 p-5 lg:container lg:gap-10 lg:py-10">
                <Badge className="gap-1 w-fit text-base uppercase border-primary border-2 px-3 py-[0.375rem]" variant="outline">
                    {CATEGORY_ICON[params.slug as keyof typeof CATEGORY_ICON]}
                    {category.name}
                </Badge>

                <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
                    {category.products.map((product) => <ProductItem key={product.id} product={computeTotalPrice(product)} />)}
                </div>
            </div>
    );
}
 
export default CategoryProducts;