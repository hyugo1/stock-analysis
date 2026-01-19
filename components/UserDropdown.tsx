'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut, Settings } from "lucide-react";
import NavItems from "@/components/NavItems";
import { signOut } from "@/lib/actions/auth.actions";

interface UserDropdownProps {
  user: User;
  initialStocks: StockWithWatchlistStatus[];
}

const UserDropdown = ({ user, initialStocks }: UserDropdownProps) => {
  const router = useRouter();

  // Compute safe initial from user name or email
  const safeInitial = user?.name || user?.email || "?";

  // signout
  const handleSignOut = async () => {
    // Perform sign out logic
    await signOut();

    // Refresh to update auth state and redirect
    router.refresh();
    router.push("/sign-in");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 rounded-xl bg-[#0a1628] hover:bg-white/10 hover:ring-2 hover:ring-primary/30 focus:ring-2 focus:ring-primary/20 px-4 py-2 text-sm font-medium text-foreground transition-all duration-300 group"
        >
          <Avatar className="h-8 w-8 ring-2 ring-primary/20 transition-all duration-300 group-hover:ring-primary/50 group-hover:shadow-[0_0_15px_oklch(0.65_0.2_260_/_30%)]">
            <AvatarImage
              src={user.image || "https://github.com/shadcn.png"}
              alt={user.name}
            />
            <AvatarFallback className="bg-wealth-gold text-foreground text-sm font-bold transition-all duration-300 hover:scale-110">
              {safeInitial[0]}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:flex flex-col items-start leading-tight">
            <span className="font-medium text-base cursor-pointer transition-all duration-300">
              {user.name}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-64 bg-[#0a1628] border border-white/10 rounded-xl shadow-xl p-2"
        align="end"
      >
        {/* Mobile: Show NavItems first, Desktop: Hide */}
        <nav className="sm:hidden">
          <NavItems initialStocks={initialStocks} />
          <DropdownMenuSeparator className="bg-white/10 my-2" />
        </nav>
        
        <DropdownMenuLabel>
          <div className="flex relative items-center gap-3 py-2">
            <Avatar className="h-10 w-10 ring-2 ring-primary/20">
              <AvatarImage
                src={user.image || "https://github.com/shadcn.png"}
                alt={user.name}
              />
              <AvatarFallback className="bg-wealth-gold text-foreground text-sm font-bold hover:scale-110 transition-transform">
                {safeInitial[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium text-base">{user.name}</span>
              <span className="text-sm text-gray-400">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem
          onClick={() => router.push("/settings/notifications")}
          className="text-gray-200 text-md font-medium focus:text-white transition-all duration-300 rounded-lg hover:bg-white/10 hover:translate-x-1 cursor-pointer"
        >
          <Settings className="mr-2 h-4 w-4 transition-transform duration-300" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem
          onClick={handleSignOut}
          className="text-gray-200 text-md font-medium focus:text-white transition-all duration-300 rounded-lg hover:bg-white/10 hover:translate-x-1 cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4 transition-transform duration-300" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;