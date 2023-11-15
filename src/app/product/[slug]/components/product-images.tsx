"use client"

import Image from 'next/image'
import { useState } from 'react'

interface ProductImagesProps {
    name: string
    imageUrls: string[]
}

const ProductImages = ({imageUrls, name}: ProductImagesProps) => {
    const [currentImage, setCurrentImage] = useState(imageUrls[0])

    const handleImageClick = (imageUrl: string) => {
        setCurrentImage(imageUrl)
    }

    return ( 
        <div className="flex flex-col lg:min-h-full lg:w-3/5">
            <div className="bg-accent h-[380px] w-full flex items-center justify-center lg:h-full lg:rounded-lg">
                <Image src={currentImage} alt={name} 
                height={0} width={0} sizes='100vw' className='h-auto w-auto max-h-[70%] max-w-[80%]'
                style={{
                    objectFit:'contain'
                }}/>
            </div>

            <div className="mt-8 px-5 grid grid-cols-4 gap-4 lg:px-0">
                {imageUrls.map(image => (
                    <button 
                        key={image} 
                        className={`
                            bg-accent rounded-lg flex items-center justify-center h-[100px] 
                            ${image === currentImage && 'border-2 border-primary border-solid'}
                        `}
                        onClick={() => handleImageClick(image)}>
                        <Image 
                            src={image}
                            alt={name}
                            height={0} width={0} 
                            sizes='100vw' 
                            className='h-auto w-auto max-h-[70%] max-w-[80%]'
                        />
                    </button>
                ))}
            </div>
        </div>
     );
}
 
export default ProductImages;