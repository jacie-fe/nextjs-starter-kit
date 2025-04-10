export default function AuthLayout({
  children,
}: {
  readonly children: React.ReactNode
}) {
  return (
    <>
      <div className='flex min-h-[calc(100vh-(var(--header-height)+var(--footer-height)))] flex-col items-center justify-center dark:bg-gray-900'>
        {children}
      </div>
    </>
  )
}
