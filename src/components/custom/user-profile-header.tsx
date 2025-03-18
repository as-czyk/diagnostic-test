"use client";

import { useState } from "react";
import {
  User,
  Settings,
  HelpCircle,
  LogOut,
  Bell,
  ChevronDown,
  MessageSquare,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface UserProfileHeaderProps {
  userName?: string;
  userRole?: string;
  userImage?: string;
  onSignOut?: () => void;
}

export default function UserProfileHeader({
  userName = "Sarah Johnson",
  userRole = "Tutor",
  userImage = "/placeholder.svg?height=40&width=40",
  onSignOut = () => console.log("Sign out clicked"),
}: UserProfileHeaderProps) {
  return (
    <div className="flex items-center rounded-full bg-gray-50 shadow-md p-1.5 border border-gray-100">
      {/* User Profile */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-8 flex items-center gap-2 rounded-full pl-1 pr-2 ml-1"
          >
            <Avatar className="h-7 w-7 border-2 border-white shadow-sm">
              <AvatarImage src={userImage} alt={userName} />
              <AvatarFallback className="bg-[#DB5461] text-white text-xs">
                {userName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start text-sm">
              <span className="font-medium leading-none text-xs">
                {userName}
              </span>
            </div>
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{userName}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {userRole}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Help & Support</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer text-red-600 focus:text-red-600"
            onClick={onSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
