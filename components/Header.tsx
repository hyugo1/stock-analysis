import Link from "next/link"
import Image from "next/image"
import NavItems from "@/components/NavItems";
import UserDropdown from "@/components/UserDropdown";

const Header = ({ user } : { user: User }) => {
  return (
    <header className="sticky top-0 header">
      <div className="container header-wrapper">
        <Link href="/">
          <Image 
            src="/assets/icon/logo.png" alt="Logo" width={180} height={55} priority unoptimized
            className="h-10 w-auto cursor-pointer"
          />
        </Link>
        <nav className="hidden sm:block">
          <NavItems/>
        </nav>
      <UserDropdown user={user} />

      </div>
    </header>
  )
}

export default Header