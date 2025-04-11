import bgImage from '@/assets/banner.svg'
import Banner from './banner'

export default async function Layout() {
  return (
    <>
      <div
        className='mt-[-80px] h-[500px] bg-cover bg-center bg-no-repeat relative'
        style={{ backgroundImage: `url(${bgImage.src})` }}
      >
        <Banner />
      </div>
      <div>
        <div className='container mx-auto flex h-full items-center justify-center'>
          <h1 className='text-5xl font-bold text-white'>Welcome to Our Site</h1>
        </div>
        <div className='container mx-auto flex h-[3000px] items-center justify-center'>
          <p className='text-xl text-white'>
            Your one-stop solution for all your needs.
          </p>
        </div>
      </div>
    </>
  )
}
