import Detail from './components/detail'
import Introduction from './components/introduction'
import { featuresSidebar } from './constants'
import DocumentLayout from '@/components/static-layout/document-layout'

export default function Support() {
  return (
    <DocumentLayout sidebarItems={featuresSidebar}>
      <div className='document-heading mt-7 space-y-4 sm:mt-0' id='support'>
        Need Help? We’re Here for You!{' '}
      </div>
      <div className='space-y-4'>
        <Introduction />
        <Detail />
      </div>
    </DocumentLayout>
  )
}
