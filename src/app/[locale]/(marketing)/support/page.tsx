import Detail from './components/detail'
import Introduction from './components/introduction'

export default function Support() {
  return (
    <>
      <div className='mt-7 space-y-4 sm:mt-0 text-2xl font-semibold tracking-tight'>
        Need Help? We’re Here for You!
      </div>
      <div className='space-y-4'>
        <Introduction />
        <Detail />
      </div>
    </>
  )
}
