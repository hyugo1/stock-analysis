'use client'

import { NAV_ITEMS } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchCommand from "@/components/SearchCommand";


const NavItems = ({initialStocks} : {initialStocks: StockWithWatchlistStatus[]}) => {
    const pathname = usePathname()

    const isActive = (path: string) => {
        if (path === '/') return pathname === '/';

        return pathname.startsWith(path);
    }

return (
    <ul className="flex flex-col sm:flex-row p-2 gap-3 sm:gap-10 font-medium">
        {NAV_ITEMS.map(({ href, label }, index) => {
            if (href === "/search") {
                return (
                    <li key="search-trigger" className="animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                        <SearchCommand
                            renderAs="text"
                            label="Search"
                            initialStocks={initialStocks}
                        />
                    </li>
                )
            }

            return <li key={href} className="animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <Link href={href} className={`hover:text-primary transition-all duration-300 hover:scale-105 inline-block ${
                    isActive(href) ? "text-primary" : "text-muted-foreground"
                }`}>
                    {label}
                </Link>
            </li>
        })}
    </ul>
)
}

export default NavItems
