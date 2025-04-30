"use client"
import { Flex, TabNav } from "@radix-ui/themes"
import Link from "next/link"
import { usePathname } from "next/navigation"
export default function NavQuotes() {
    const quotes = [
        { name: "Proceso Simplificado", path: "/simplificado" },
        { name: "Proceso Exonerado", path: "/exonerado" },
    ]
    const path = usePathname()

    return (
        <Flex direction="column" gap="4" pb="2">
            <TabNav.Root color="orange">
                {quotes.map((quote) => (
                    <TabNav.Link
                        asChild
                        key={quote.path}
                        active={path === quote.path}
                    >
                        <Link href={quote.path}>{quote.name}</Link>
                    </TabNav.Link>
                ))}
            </TabNav.Root>
        </Flex>
    )
}
