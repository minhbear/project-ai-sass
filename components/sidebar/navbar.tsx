"use client";

import { NAVIGATIONS } from "@/constants";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar-store";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { isMinimal, handleClose } = useSidebarStore();
  const pathname = usePathname();

  return (
    <div className="px-4">
      {NAVIGATIONS.map(({ icon, slug, title, url }) => (
        <div key={url} className="mb-2">
          <Link href={url} onClick={handleClose}>
            <div
              className={cn(
                "flex items-center py-1 rounded-lg opacity-70",
                "hover:opacity-100",
                isMinimal && "px-1",
                pathname.includes(url) &&
                  "transition-colors bg-gradient-to-l from-slate-800 to-slate-900 shadow-[inset_0px_0.0625rem_0_rgba(255,255,255,0.05),0_0.25rem_0.5rem_0_rgba(0,0,0,0.1)] opacity-100"
              )}
            >
              <div className="flex items-center p-2">
                <div>
                  <Image width={24} height={24} src={icon} alt={title} />
                </div>
                {!isMinimal && <span className="ml-4 text-sm">{title}</span>}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Navbar;
