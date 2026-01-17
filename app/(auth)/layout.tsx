import Link from "next/link";
import Image from "next/image";
import {auth} from "@/lib/better-auth/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";
import AuthRightSection from "@/components/AuthRightSection";

const Layout = async ({ children }: { children : React.ReactNode }) => {
    const session = await auth.api.getSession({ headers: await headers() })
    if(session?.user) redirect('/')

  return (
    <main className="auth-layout">
      <section className="auth-left-section scrollbar-hide-default">
        <Link href="/" className="auth-logo">
         <Image src="/assets/icon/logo.png" alt="MarketPulse logo" width={190} height={45} className='h-10 w-auto' />
        </Link>
        <div className="pb-6 lg:pb-8 flex-1">{children}</div>
      </section>

      <AuthRightSection />
    </main>
  )
}

export default Layout