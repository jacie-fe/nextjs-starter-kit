export default async function Layout(props: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  return (
    <>
      {props.children}
    </>
  )
}
