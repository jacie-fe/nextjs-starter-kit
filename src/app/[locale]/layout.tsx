import type { Metadata } from 'next'
import '@/app/styles/globals.css'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/navigation'
import { notFound } from 'next/navigation'
import { Toaster } from '@/components/ui/sonner'
import Header from '@/components/custom/header/header'
import Footer from '@/components/custom/footer'
import { Roboto } from 'next/font/google'
import { cn } from '@/lib/utils'
import IntlErrorHandlingProvider from '@/providers/IntlErrorHandlingProvider'
import ReactQueryProvider from '@/providers/ReactQueryProvider'
import { AuthProvider } from '@/providers/AuthProvider'

const roboto = Roboto({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin-ext'],
})

export const metadata: Metadata = {
  title: 'GLO Mega Lottery',
  description: 'GLO Mega Lottery',
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  if (!routing.locales.includes(locale as 'en' | 'th')) {
    notFound()
  }

  setRequestLocale(locale)

  // Using internationalization in Client Components
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body
        suppressHydrationWarning
        className={cn('overflow-hidden', roboto.className)}
      >
        <IntlErrorHandlingProvider locale={locale} messages={messages}>
          <ReactQueryProvider>
            <AuthProvider>
              <Header />
              <Toaster richColors />
              <main
                id='content'
                className='scrollable-content h-[calc(100vh-var(--footer-height))] overflow-auto pt-[var(--header-height)] transition-[margin]'
              >
                {children}
              </main>
              <Footer />
            </AuthProvider>
          </ReactQueryProvider>
        </IntlErrorHandlingProvider>
      </body>
    </html>
  )
}
