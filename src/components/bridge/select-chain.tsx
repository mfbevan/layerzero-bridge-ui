"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { type Chain } from "thirdweb/chains";
import { useMemo, type FC } from "react";
import Image from "next/image";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { useDisclosure } from "~/hooks/use-disclosure";
import { getChainIcon } from "~/config/chains";

export interface SelectChainProps {
  value?: Chain;
  onChangeValue: (chain: Chain) => void;
  chains: Chain[];
  className?: string;
}

export const SelectChain: FC<SelectChainProps> = ({
  value,
  onChangeValue,
  chains,
  className,
}) => {
  const { isOpen, onToggle } = useDisclosure();

  const options = useMemo(() => {
    return chains.map((chain) => ({
      value: chain.id.toString(),
      label: chain.name,
    }));
  }, [chains]);

  const selectedOption = useMemo(() => {
    return options.find((option) => option.value === value?.id.toString());
  }, [options, value]);

  return (
    <Popover open={isOpen} onOpenChange={onToggle}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          className={cn("w-full justify-between pl-1", className)}
        >
          <div className="flex items-center gap-2">
            <Image
              src={getChainIcon(Number(selectedOption?.value))}
              alt={selectedOption?.label ?? ""}
              className="size-6"
              width={24}
              height={24}
              unoptimized
            />
            {selectedOption?.label ?? "Select chain..."}
          </div>
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search chains..." className="h-9" />
          <CommandList>
            <CommandEmpty>No chain found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    onChangeValue(
                      chains.find(
                        (chain) => chain.id.toString() === currentValue,
                      )!,
                    );
                    onToggle();
                  }}
                >
                  <Image
                    src={getChainIcon(Number(option.value))}
                    alt={option.label ?? ""}
                    className="size-6"
                    width={24}
                    height={24}
                    unoptimized
                  />
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value?.id.toString() === option.value
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
