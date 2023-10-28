import { Category } from "@prisma/client";
import Image from 'next/image'

interface CategoryItemProps {
    category: Category
}

const CategoryItem = ({category}: CategoryItemProps) => {
    return ( 
        <div className="flex flex-col">
            <div className="w-full h-[150px] flex items-center rounded-tl-lg rounded-tr-lg justify-center bg-category-item-gradient">
                <Image 
                    src={category.imageUrl} 
                    alt={category.name}
                    width={0}
                    height={0}
                    className="h-auto w-auto max-h-[70%] max-w-[80%]"
                    sizes="100vw"
                    style={{
                        objectFit: "contain",
                      }}
                />
            </div>

            <div className="bg-accent py-3 rounded-bl-lg rounded-br-lg font">
                <p className="text-sm font-semibold text-center"> {category.name} </p>
            </div>
        </div> 
    );
}
 
export default CategoryItem;