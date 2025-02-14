"use client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { logout } from "@/services/auth-service";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  async function logoutUser() {
    try {
      const { data } = await logout();
      toast.success(data?.message || "User logout successfully.");
      localStorage.clear();
      router.push("/");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(JSON.parse(storedUser));
  }, []);

  return (
        <nav className="sticky top-0 z-50 bg-white shadow-md p-2 flex justify-between items-center">

      <div>
        <h1 className="text-xl font-bold text-gray-800">
          {user?.firstname || ""} {user?.lastname || ""}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 h-12 p-2 border border-neutral-300/80"
            >
              <Avatar>
                {/* <AvatarImage src="/user.png" alt="User Avatar" /> */}
                <AvatarFallback>
                  {user?.firstname?.charAt(0) + user?.lastname?.charAt(0) ||
                    "U"}
                </AvatarFallback>
              </Avatar>
              {user?.firstname || "User"} {user?.lastname || ""}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={logoutUser}>
              <LogOut size={16} className="mr-2" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Logout */}
        <Button
          variant="destructive"
          className="flex gap-2 h-12"
          onClick={logoutUser}
        >
          <LogOut size={16} />
        </Button>
      </div>
    </nav>
  );
}

export default Navbar;
