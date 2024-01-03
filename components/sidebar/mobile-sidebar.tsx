'use client'

import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";
import Sidebar from ".";
import { useSidebarStore } from "@/stores/sidebar-store";
import { cn } from "@/lib/utils";

interface MobileSidebarProps {
  isProPlan?: boolean;
  userLimitCount: number;
  className?: string
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({
  isProPlan,
  userLimitCount,
}) => {
  const { isOpen } = useSidebarStore()

  return (
      <Sheet open={isOpen} >
        <SheetContent 
          side="left"
          className={cn(
            "w-screen border-none bg-black p-0 pt-8",
          )}
        >
          <Sidebar 
            userLimitCount={userLimitCount} 
            isProPlan={isProPlan}
          />
        </SheetContent>
      </Sheet>
  );
};

export default MobileSidebar;
