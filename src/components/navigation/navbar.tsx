"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";

import { WalletButton } from "../wallet/wallet-button";

import { ColorModeButton } from "./color-mode-button";
import { SelectEnvironment } from "./select-environment";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";

export const Navbar = () => {
  return (
    <div className="w-screen border-b p-2">
      <NavigationMenu className="max-w-screen mx-auto flex w-full items-center justify-between">
        <NavigationMenuList className="flex items-center justify-between">
          <Image
            src="/icon.jpeg"
            alt="logo"
            className="size-8"
            width={32}
            height={32}
          />
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem></NavigationMenuItem>
        </NavigationMenuList>

        <div className="flex items-center gap-2">
          <SelectEnvironment />
          <ColorModeButton />
          <WalletButton />
        </div>
      </NavigationMenu>
    </div>
  );
};
