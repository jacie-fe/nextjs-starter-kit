import type { Metadata } from 'next'
import '@/app/styles/globals.css'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import { routing } from '@/i18n/navigation'
import { notFound } from 'next/navigation'
import { Toaster } from '@/components/ui/sonner'
import Header from '@/components/custom/header/header'
import { AuthProvider } from '@/providers/auth'
import ReactQueryProvider from '@/providers/react-query'
import Footer from '@/components/custom/footer'

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
      <body suppressHydrationWarning className='overflow-hidden'>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ReactQueryProvider>
            <AuthProvider>
              <Header />
              <Toaster richColors />
              <main
                id='content'
                className='scrollable-content pt-[var(--header-height)] h-[calc(100vh-var(--footer-height))] transition-[margin] overflow-auto'
              >
                {children}
              </main>
              <Footer />
            </AuthProvider>
          </ReactQueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
