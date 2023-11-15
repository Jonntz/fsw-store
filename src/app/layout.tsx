import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/ui/header'
import { AuthProvider } from '@/providers/auth'
import Footer from '@/components/ui/footer'
import CartProvider from '@/providers/cart'
import ToastProvider from "@/providers/toast";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FSW Store',
  description: 'A simple store implementation in NextJs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='flex flex-col h-full'>
          <AuthProvider>
            <CartProvider>
              <ToastProvider>
                <Header />
                  <div className="flex-1">
                    {children}
                  </div>
                <Footer/>
              </ToastProvider>
            </CartProvider>
          </AuthProvider>
        </div>
      </body>
    </html>
  )
}
