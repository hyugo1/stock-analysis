import Link from "next/link";
import Image from "next/image";
import {auth} from "@/lib/better-auth/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";

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

      <section className="auth-right-section">
        <div className="z-10 relative lg:mt-4 lg:mb-16">
          <blockquote className="auth-blockquote">
            MarketPulse made me a better investor. The insights and data I get here are invaluable.
          </blockquote>
          <div className="flex items-center justify-between">
            <div>
              <cite className="auth-testimonial-author">
                - Robert Anderson
                <p className="max-md:text-xs text-gray-400">Professional Trader</p>
              </cite>
            </div>
            <div className="flex items-center gap-0.5">
              {
                [1,2,3,4,5].map((star) => (
                  <Image src="/assets/icon/star.png" alt="Star" width={30} height={30} key={star} className="w-6 h-6" />
                ))
              }

            </div>
          </div>
        </div> 
        <div className="flex-1 flex items-end justify-center lg:justify-start">
          <Image src="/assets/images/stockdashboard.png" alt="Dashboard Preview" width={1440} height={1150} className="auth-dashboard-preview"/>
        </div>
      </section>
    </main>
  )
}

export default Layout