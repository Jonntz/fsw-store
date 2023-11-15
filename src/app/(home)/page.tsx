import Categories from './components/categories'
import { db } from '@/lib/prisma'
import ProductList from '../../components/ui/product-list'
import SectionTitle from '../../components/ui/section-title'
import PromoBanner from './components/promo-banner'
import Image from "next/image";


export default async function Home() {
  const deals = await db.product.findMany({
    where:{
      discountPercentage:{
        gt: 0
      }
    }
  })

  const keyboards = await db.product.findMany({
    where:{
      category:{
        slug:'keyboards'
      }
    }
  })

  const mouses = await db.product.findMany({
    where: {
      category: {
        slug: 'mouses',
      },
    },
  });

  return (
    <>
      <div className="mx-auto max-w-[1920px]">
        <Image
          src="/deals-banner.png"
          className="hidden h-auto w-full lg:block"
          width={0}
          height={0}
          sizes="100vw"
          alt="Até 55% de desconto esse mês!"
        />
      </div>

      <div className="mx-auto flex flex-col gap-8 py-8 lg:container lg:gap-10">
        <PromoBanner
          src="/banner-home-01.png"
          alt="Até 55% de desconto esse mês!"
          className="lg:hidden"
        />

        <div className="px-5 lg:mt-2">
          <Categories />
        </div>

        <div className="flex flex-col gap-3 lg:gap-5">
          <SectionTitle className="pl-5">Ofertas</SectionTitle>
          <ProductList products={deals} />
        </div>

        
        <div className='hidden md:flex justify-between items-center w-full gap-1 '>
          <PromoBanner
            src="/banner-home-02.png"
            alt="Até 55% de desconto em mouses!"
            sizes='50vw'
            className='w-full'
          />

          <PromoBanner
            src="/banner-home-03.png"
            alt="Até 55% de desconto em mouses!"
            sizes='50vw'
            className='w-full'
          />
        </div>

        <PromoBanner
          src="/banner-home-02.png"
          alt="Até 55% de desconto em mouses!"
          className='lg:hidden'
        />

        <div className="flex flex-col gap-3 lg:gap-5">
          <SectionTitle  className="pl-5">Teclados</SectionTitle>
          <ProductList products={keyboards} />
        </div>

        <div className="mx-auto max-w-[1920px]">
          <Image
            src="/banner-fretegrátis.png"
            className="hidden h-auto w-full lg:block"
            width={0}
            height={0}
            sizes="100vw"
            alt="Até 55% de desconto esse mês!"
          />
        </div>

        <PromoBanner
          src="/banner-home-03.png"
          alt="Até 55% de desconto em mouses!"
          className="lg:hidden"
        />

        <div className="flex flex-col gap-3 lg:gap-5">
          <SectionTitle className="pl-5">Mouses</SectionTitle>
          <ProductList products={mouses} />
        </div>
      </div>
    </>
  )
}
