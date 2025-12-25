import Image from "next/image"
import Link from "next/link"
import NavItems from "./NavItems"
import UserDropdown from "./UserDropdown"

const Header = () => {
  return (
    <header className="sticky top-0 header">Header
      <div className="container header-wrapper">
        <Link href="/">
          <Image src="vercel.svg" alt="Logo" width={150} height={50} className="h-8 w-auto cursor-pointer"/>
        </Link>
        <nav className="hidden sm:block">
          <NavItems/>
        </nav>
      <UserDropdown/>

      </div>
    </header>
  )
}

export default Header