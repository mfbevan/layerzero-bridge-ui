"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import { WalletButton } from "../wallet/wallet-button";
import { ColorModeButton } from "./color-mode-button";

export const Navbar = () => {
  return (
    <div className="w-screen border-b border-input p-2">
      <NavigationMenu className="max-w-screen mx-auto flex w-full items-center justify-between">
        <NavigationMenuList className="flex items-center justify-between">
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
          <WalletButton />
          <ColorModeButton />
        </div>
      </NavigationMenu>
    </div>
  );
};
