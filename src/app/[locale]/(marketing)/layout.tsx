import Footer from '@/components/custom/footer'
import { setRequestLocale } from 'next-intl/server'

export default async function Layout(props: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await props.params
  setRequestLocale(locale)
  // const t = await getTranslations({
  //   locale,
  //   namespace: 'RootLayout',
  // });

  return (
    <>
      {props.children}
      <Footer />
    </>
  )
}
