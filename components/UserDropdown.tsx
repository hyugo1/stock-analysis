'use client';

import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator

}from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import { LogOut } from "lucide-react";
import NavItems from "./NavItems";
// import {LogOut} from "lucide-react";
// import NavItems from "@/components/NavItems";
// import {signOut} from "@/lib/actions/auth.actions";



const UserDropdown = () => {
    const router = useRouter();


    //signout 
    const handleSignOut = async() => {
        // Perform sign out logic 


        // After sign out, redirect to home page
        router.push("/sign-in");
    }   

    const user = {name: 'BOB', email: 'testing@example.com'};

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant = "ghost" className="flex items-center gap-2 rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="https://github.com/shadcn.png" alt={user.name}/>
                            <AvatarFallback className= "bg-yellow-400 text-yellow-800 text-sm font-bold">
                                {user.name.charAt(0)}
                            </AvatarFallback>

                    
                    </Avatar>
                    <div className ="hidden md:flex flex-col items-start leading-tight">
                        <span className="font-medium text-base text-gray-500">
                            {user.name}
                        </span>
                    </div>
                    
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-gray-500" >
                <DropdownMenuLabel>
                    <div className="flex relative item-center gap-3 py-2">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src="https://github.com/shadcn.png" alt={user.name}/>
                                <AvatarFallback className= "bg-yellow-400 text-yellow-800 text-sm font-bold">
                                    {user.name.charAt(0)}
                                </AvatarFallback>
                        </Avatar>
                        <div className ="flex flex-col">
                            <span className="font-medium text-base text-gray-500">
                                {user.name}
                            </span>
                            <span className="text-sm text-gray-500">{user.email}</span>
                        </div>
                    </div>
                    {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>             */}
                </DropdownMenuLabel>   
                <DropdownMenuSeparator className="bg-gray-600"/>
                    <DropdownMenuItem onClick={handleSignOut} className="text-gray-100 text-md font-medium cursor-pointer focus:text-yellow-500 transition-colors cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4 hidden sm:block"/>
                        Logout
                    </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-600 hidden sm:block "/>
                <nav className="sm:hidden">
                        <NavItems>
                            
                        </NavItems>
                </nav>


            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export default UserDropdown