import Link from "next/link"
import Image from "next/image"
import NavItems from "@/components/NavItems";
import UserDropdown from "@/components/UserDropdown";
import { searchStocks } from "@/lib/actions/finnhub.actions";

const Header = async ({ user } : { user: User }) => {
  const initialStocks = await searchStocks();
  return (
    <header className="sticky top-0 header backdrop-blur-lg">
      <div className="container header-wrapper">
        <Link href="/">
          <Image 
            src="/assets/icon/logo.png" alt="Logo" width={180} height={55} priority unoptimized
            className="h-10 w-auto cursor-pointer drop-shadow-lg hover:scale-105 transition-transform duration-300 hover:drop-shadow-xl"
          />
        </Link>
        <nav className="hidden sm:block">
          <NavItems initialStocks={initialStocks}/>
        </nav>
      <UserDropdown user={user} initialStocks={initialStocks}/>

      </div>
    </header>
  )
}

export default Header