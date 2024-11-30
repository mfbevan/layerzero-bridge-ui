"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { WalletButton } from "../wallet/wallet-button";

import { SelectEnvironment } from "./select-environment";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import { useColorModeValue } from "~/hooks/use-color-mode";

export const Navbar = () => {
  return (
    <div className="fixed inset-x-0 top-0 w-screen border-b bg-background p-2">
      <NavigationMenu className="max-w-screen mx-auto flex w-full items-center justify-between">
        <NavigationMenuList className="flex items-center justify-between">
          <Image
            suppressHydrationWarning
            src={useColorModeValue("/icon_white.jpeg", "/icon.jpeg")}
            alt="logo"
            className="size-8"
            width={32}
            height={32}
          />
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Bridge
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/faucet" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Faucet
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>

        <div className="flex items-center gap-2">
          <SelectEnvironment />
          <WalletButton />
        </div>
      </NavigationMenu>
    </div>
  );
};
