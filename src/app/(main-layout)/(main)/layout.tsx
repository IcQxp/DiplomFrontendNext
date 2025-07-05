import { Header } from "@/components/Header/Header"
import "./global.scss"
import { Footer } from "@/components/Footer/Footer"


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main style={{minHeight:"60vh"}}>
        {children}
      </main>
      <Footer />
    </>
  )
}
