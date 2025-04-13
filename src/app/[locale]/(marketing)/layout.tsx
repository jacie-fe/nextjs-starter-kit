export default async function Layout(props: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  return (
    <div className="container mx-auto px-3 py-6">
      {props.children}
    </div>
  )
}
