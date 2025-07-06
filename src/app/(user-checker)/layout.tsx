import AuthChecker from "@/components/AuthChecker/AuthChecker"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <AuthChecker>
      {children}
    </AuthChecker>
  )
};