/**
 * 顶端导航栏，包括时间，设置，头像
 */

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Settings } from "lucide-react";

const Nav = () => {
  return (
    <div className="absolute z-10">
      <div className="fixed top-4 left-7 cursor-pointer">
        <HoverCard>
          <HoverCardTrigger>
            <Avatar className="w-8 h-8 ring-2 ring-white hover:ring-gray-900">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </HoverCardTrigger>
          <HoverCardContent align="start" sideOffset={10} className="w-44 h-52">
            UserName
          </HoverCardContent>
        </HoverCard>
      </div>
      <div className="fixed top-5 right-16 text-cyan-50 leading-8 h-8 text-lg font-semibold cursor-pointer px-4 rounded-full hover:bg-[#0007]">
        <p>11 : 30 : 25</p>
      </div>
      <div className="fixed top-4 right-6 cursor-pointer w-10 h-10 flex justify-center items-center rounded-sm hover:bg-[#0007]">
        <Settings color="white" className="w-8 h-8" />
      </div>
    </div>
  );
};

export default Nav;
