import ApiReference from './components/api-reference'
import CommonSetup from './components/common-setup'
import Introduction from './components/introduction'
import { docsSidebar } from './constants'
import DocumentLayout from '@/components/static-layout/document-layout'
import { Separator } from '@/components/ui/separator'

export default function Docs() {
  return (
    <DocumentLayout sidebarItems={docsSidebar}>
      <div className='mt-7 space-y-4 sm:mt-0'>
        <div id='getting-started' className='document-heading'>
          Getting started
        </div>
        <Introduction />
        <Separator className='my-12' />
        <CommonSetup />
        <Separator className='my-12' />
        <div id='api-reference' className='document-heading'>
          API reference
        </div>
        <ApiReference />
      </div>
    </DocumentLayout>
  )
}
