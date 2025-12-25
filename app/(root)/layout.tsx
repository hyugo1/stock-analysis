import Header from "@/components/Header"

const Layout = ({children} :{children : React.ReactNode}) => {
  return (
    <main className="min-h-screen text-gray-500>">
        <Header/>
        <div className="container mx-auto px-10 ">
            {children}
        </div>
    </main>
  )
}

export default Layout