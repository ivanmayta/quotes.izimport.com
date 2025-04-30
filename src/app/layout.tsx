import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "@radix-ui/themes/styles.css"
import "./globals.css"

import NavQuotes from "@/components/nav-quotes"
import Header from "@/components/header"
import { ThemeProvider } from "@/components/ui/theme-provider"
import { Theme } from "@radix-ui/themes"
import Footer from "@/components/footer"

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
})

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: "Cotiza tus importaciones",
    description: "Cotiza y rentabiliza tus importaciones",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="es" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Theme>
                        <Header />
                        <h1 className="text-center text-5xl py-12 font-semibold text-zinc-800 dark:text-zinc-200">
                            Cotiza y rentabiliza tus importaciones
                        </h1>
                        <div className="flex flex-col w-full max-w-5xl mx-auto px-4">
                            <NavQuotes />
                            {children}
                        </div>
                        <Footer />
                    </Theme>
                </ThemeProvider>
            </body>
        </html>
    )
}
