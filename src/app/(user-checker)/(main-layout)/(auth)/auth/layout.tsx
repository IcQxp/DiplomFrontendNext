import "@/app/global.scss"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <p>ТЕСТ</p>
      {children}
    </main>
  )
}
