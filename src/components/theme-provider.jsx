"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes";

function ThemeProvider({ children }) {
  return (
    <NextThemesProvider 
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
    >
      { children }
    </NextThemesProvider>
  )
}

export default ThemeProvider;