"use client";
import React, { useState, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { UserButton, useUser } from '@clerk/nextjs'
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { BabyIcon, BadgePlusIcon, CircleUser, Home, User, Users2Icon } from "lucide-react";

export function SidebarDemo({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState<string>("Guest");
  const [image, setImage] = useState<string>("/user.svg");
  const [link,setLink] = useState<string>('/auth/signin/a')
  const { user } = useUser();

  // Update name and image when user changes
  useEffect(() => {
    if (user) {
      setName(user.fullName || "Guest");
      setImage(user.imageUrl || "/user.svg");
      setLink('/account')
    }
  }, [user]);

  const links = [
    {
      label: "Menu",
      href: "/",
      icon: (
        <Home className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "/profile",
      icon: (
        <CircleUser className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Create Blog",
      href: "/create",
      icon: (
        <BadgePlusIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "About us",
      href: "/aboutus",
      icon: (
        <Users2Icon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row dark:bg-neutral-800 flex-1 w-full mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: name,
                href: link,
                icon: (
                  <UserButton />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex-1 overflow-y-auto ">
        {children}
      </div>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <Image src={"/logo.png"} alt={""} height={50} width={50}></Image>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="lg:text-2xl text:xl text-black font-mono font-semibold dark:text-white whitespace-pre"
      >
        Blogger
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <Image src='/logo.png' alt={""} height={50} width={50}></Image>
    </Link>
  );
};
