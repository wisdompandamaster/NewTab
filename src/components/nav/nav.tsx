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
            <Avatar className="w-8 h-8 ring-2 ring-white hover:ring-black">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </HoverCardTrigger>
          <HoverCardContent align="start" sideOffset={10} className="w-44 h-48">
            <p className="text-gray-500 font-semibold text-center">
              wisdompanda
            </p>
            <hr className="mt-3" />
            <p>个人登录信息</p>
          </HoverCardContent>
        </HoverCard>
      </div>
      <div className="fixed top-5 right-20 cursor-pointer">
        <HoverCard>
          <HoverCardTrigger>
            <p className=" text-cyan-50 leading-8 h-8 text-lg font-semibold  ring-2 ring-white px-3 rounded-sm hover:bg-[#0005]">
              11 : 30 : 25
            </p>
          </HoverCardTrigger>
          <HoverCardContent align="end" sideOffset={10} className="w-56 h-48">
            世界时间
          </HoverCardContent>
        </HoverCard>
      </div>
      <div className="fixed top-4 right-6 cursor-pointer w-10 h-10 flex justify-center items-center rounded-sm hover:bg-[#0005]">
        <Settings color="white" className="w-8 h-8" />
      </div>
    </div>
  );
};

export default Nav;
