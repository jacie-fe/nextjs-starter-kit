import Banner from './home/banner'
import HomeFeatures from './home/home-features'
import Benefit from './home/benefit'
import DownloadApp from './home/download-app'

type IIndexProps = {
  params: Promise<{ locale: string; children: React.ReactNode }>
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'th' }]
}

export default async function Index(props: IIndexProps) {

  return (
    <div>
      <Banner />
      <HomeFeatures />
      <Benefit />
      <DownloadApp />
    </div>
  )
}
