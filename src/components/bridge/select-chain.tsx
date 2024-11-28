"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useMemo, type FC } from "react";
import Image from "next/image";
import { useSwitchActiveWalletChain } from "thirdweb/react";

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
import {
  getChain,
  toThirdwebChain,
  type LayerZeroChain,
} from "~/config/chains";

export interface SelectChainProps {
  value?: LayerZeroChain;
  onChangeValue: (chain: LayerZeroChain) => void;
  chains: LayerZeroChain[];
  className?: string;
  forceSwitch?: boolean;
}

export const SelectChain: FC<SelectChainProps> = ({
  value,
  onChangeValue,
  chains,
  className,
  forceSwitch = false,
}) => {
  const { isOpen, onToggle } = useDisclosure();
  const switchChain = useSwitchActiveWalletChain();

  const options = useMemo(() => {
    return chains.map((chain) => ({
      value: chain.id.toString(),
      label: chain.name,
    }));
  }, [chains]);

  const selectedOption = useMemo(() => {
    return options.find((option) => option.value === value?.id.toString());
  }, [options, value]);

  const selectedChain = useMemo(() => {
    return getChain(Number(selectedOption?.value));
  }, [selectedOption]);

  useEffect(() => {
    if (forceSwitch && selectedOption) {
      const chain = chains.find(
        (chain) => chain.id.toString() === selectedOption.value,
      );
      if (chain) void switchChain(toThirdwebChain(chain));
    }
  }, [forceSwitch, switchChain, selectedOption, chains]);

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
              src={selectedChain?.icon ?? "./icon_gray.jpeg"}
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
                    onChangeValue(getChain(Number(currentValue)));
                    onToggle();
                  }}
                >
                  <Image
                    src={getChain(Number(option.value)).icon}
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
