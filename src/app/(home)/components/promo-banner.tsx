import { ImageProps } from "next/image";
import Image from 'next/image'
import { cn } from "@/lib/utils";

const PromoBanner = ({alt, className, ...props}: ImageProps) => {
    return ( 
        <Image             
            height={0}
            width={0}
            className={cn("h-auto w-full px-5", className)}
            sizes='100vw'
            alt={alt}
            {...props}
        />
     );
}
 
export default PromoBanner;