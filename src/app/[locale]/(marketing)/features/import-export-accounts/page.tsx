import DetailFeatures from './components/detail-features'
import Introduction from './components/introduction'
import { featuresSidebar } from './constants'
import DocsBreadcrumb from '@/components/static-layout/breadcrumb-docs'
import DocumentLayout from '@/components/static-layout/document-layout'
import { Separator } from '@/components/ui/separator'

export default function ImportExportAccount() {
  return (
    <DocumentLayout sidebarItems={featuresSidebar}>
      <DocsBreadcrumb
        sources={[
          {
            name: 'Features',
          },
          {
            name: 'Import & Export Accounts',
          },
        ]}
      />
      <div className='document-heading'>Import & Export Accounts</div>
      <div className='space-y-4'>
        <Introduction />
        <Separator className='my-12' />
        <DetailFeatures />
      </div>
    </DocumentLayout>
  )
}
