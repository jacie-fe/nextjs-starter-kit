import Banner from './home/banner'
import HomeFeatures from './home/home-features'
import Benefit from './home/benefit'
import DownloadApp from './home/download-app'

export default async function Index() {
  return (
    <div>
      <Banner />
      <HomeFeatures />
      <Benefit />
      <DownloadApp />
    </div>
  )
}
