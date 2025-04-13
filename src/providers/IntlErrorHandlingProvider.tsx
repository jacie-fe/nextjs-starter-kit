'use client'

import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl'
import { ReactNode } from 'react'

export default function IntlErrorHandlingProvider({
  children,
  locale,
  messages
}: {
  children: ReactNode,
  locale: string,
  messages: Record<string, string | AbstractIntlMessages>,
}) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      onError={(error) => console.error(error)}
      getMessageFallback={({ namespace, key }) => `${namespace}.${key}`}
    >
      {children}
    </NextIntlClientProvider>
  )
}
