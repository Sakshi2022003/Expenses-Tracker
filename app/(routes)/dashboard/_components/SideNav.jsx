"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link"; // Changed import to fix hydration issues
import { LayoutGrid, PiggyBank, ReceiptText } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

function SideNav() {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Budgets",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    {
      id: 3,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses",
    },
  ];

  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div className="h-screen border shadow-sm p-4">
      <Image src="/logo.svg" alt="logo" width={160} height={100} priority />

      <div className="mt-10">
        {menuList.map((menu) => (
          <Link key={menu.id} href={menu.path} className="block">
            <h2
              className={`flex gap-4 items-center text-gray-500 font-medium p-10 
              cursor-pointer rounded-md mb-2
              hover:text-primary hover:bg-blue-100
              ${path === menu.path ? "text-primary bg-blue-100" : ""}
              `}
            >
              <menu.icon size={20} /> {menu.name}
            </h2>
          </Link>
        ))}
      </div>

      <div className="fixed bottom-10 p-5 flex gap-2 items-center">
        <UserButton />
        <span>Profile</span>
      </div>
    </div>
  );
}

export default SideNav;
