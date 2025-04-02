import {
  SideGroup,
  SidebarDocsMobile,
} from '@/components/static-layout/sidebar-docs'
import { cn } from '@/lib/utils'
import ScrollHandler from '../custom/scroll-handler'
import ScrollTopButton from '../custom/scroll-top-button'
interface DocumentLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sidebarItems: any
}

export default function DocumentLayout({
  className,
  sidebarItems,
  children,
}: DocumentLayoutProps) {
  return (
    <>
      {/* Menu trigger for mobile */}
      <ScrollHandler />
      <div className='fixed top-[var(--header-height)] z-[20] w-full md:hidden'>
        <SidebarDocsMobile items={sidebarItems} />
      </div>
      <div className={cn('mx-auto text-[#454545] sm:container', className)}>
        <div className='relative flex sm:overflow-hidden'>
          <aside className='bg-background fixed hidden max-h-screen w-[256px] min-w-[256px] flex-shrink-0 border-r p-6 md:block md:w-[320px]'>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {sidebarItems.map((group: any) => (
              <SideGroup key={group.title} {...group} />
            ))}
          </aside>
          <main className='xs:ml-[256px] max-w-[896px] p-6 md:ml-[320px] md:p-12'>
            {children}
          </main>
        </div>
      </div>
      <ScrollTopButton />
    </>
  )
}
