import { ThemeProvider } from "next-themes";

export default function NextDarkThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider enableSystem attribute="class" defaultTheme="system">
      {children}
    </ThemeProvider>
  )
}
