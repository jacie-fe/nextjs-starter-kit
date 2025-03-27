import DetailFeatures from './components/detail'
import Introduction from './components/introduction'
import { docsSidebar } from './constants'
import DocsBreadcrumb from '@/components/static-layout/breadcrumb-docs'
import DocumentLayout from '@/components/static-layout/document-layout'
import { Separator } from '@/components/ui/separator'

export default function AuthenticatorApplication() {
  return (
    <DocumentLayout sidebarItems={docsSidebar}>
      <DocsBreadcrumb
        sources={[
          {
            name: 'Products',
          },
          {
            name: 'Authenticator Application',
          },
        ]}
      />
      <div className='document-heading'>Authenticator Application</div>
      <div className='space-y-4'>
        <Introduction />
        <Separator className='my-12' />
        <DetailFeatures />
      </div>
    </DocumentLayout>
  )
}
