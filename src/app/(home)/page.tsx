import Image from 'next/image'
import Categories from './components/categories'
import { db } from '@/lib/prisma'
import ProductList from './components/product-list'

export default async function Home() {
  const deals = await db.product.findMany({
    where:{
      discountPercentage:{
        gt: 0
      }
    }
  })

  return (
    <div>
      <Image 
        src="/banner-home-01.png"
        height={0}
        width={0}
        alt='até 55% de desconto esse mês'
        className='h-auto w-full px-5'
        sizes='100vw'
      />

      <div className="mt-6 px-5">
        <Categories />
      </div>

      <div className="mt-6">
        <p className='font-bold uppercase pl-5 mb-1'>Ofertas</p>
        <ProductList products={deals} />
      </div>

      <Image 
        src="/banner-home-02.png"
        height={0}
        width={0}
        alt='até 55% de desconto em mouses'
        className='h-auto w-full px-5'
        sizes='100vw'
      />
    </div>
  )
}
