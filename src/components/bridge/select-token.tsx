"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useMemo, type FC } from "react";

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
import { type LayerZeroChain } from "~/config/chains";
import { tokensByNetwork, type Token } from "~/config/tokens";

export interface SelectTokenProps {
  chain?: LayerZeroChain;
  value?: Token;
  onChangeValue: (token: Token) => void;
  className?: string;
}

export const SelectToken: FC<SelectTokenProps> = ({
  chain,
  value,
  onChangeValue,
  className,
}) => {
  const { isOpen, onToggle } = useDisclosure();

  const tokens = useMemo(() => {
    return chain ? (tokensByNetwork[chain.id] ?? []) : [];
  }, [chain]);

  const { options, selected } = useMemo(() => {
    const _options =
      tokens?.map((token) => ({
        value: token.address,
        label: token.name,
      })) ?? [];
    const _selected = _options.find(
      (option) => option.value === value?.address,
    );

    return { options: _options, selected: _selected };
  }, [tokens, value]);

  return (
    <Popover open={isOpen} onOpenChange={onToggle}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          className={cn("w-full justify-between", className)}
        >
          {selected?.label ?? "Select token..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search tokens..." className="h-9" />
          <CommandList>
            <CommandEmpty>No token found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    onChangeValue(
                      tokens.find((token) => token.address === currentValue)!,
                    );
                    onToggle();
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value?.address === option.value
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
