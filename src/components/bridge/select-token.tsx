"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { type FC, useState } from "react";
import { shortenAddress } from "thirdweb/utils";

import { Skeleton } from "../ui/skeleton";

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
import { useFindToken } from "~/hooks/use-find-token";

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
  const [search, setSearch] = useState("");

  const { data: searchToken, isFetching } = useFindToken({
    chain,
    address: search,
  });

  const tokens = chain ? (tokensByNetwork[chain.id] ?? []) : [];

  const options = tokens.map((token) => ({
    value: token.address,
    label: token.name,
  }));

  const selected = {
    value: value?.address,
    label: value?.name,
  };

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
          <CommandInput
            placeholder="Search tokens..."
            className="h-9"
            value={search}
            onValueChange={setSearch}
          />
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

              {isFetching && (
                <CommandItem key="loading-search-results" value={search}>
                  <Skeleton className="h-5 w-full" />
                </CommandItem>
              )}

              {searchToken && (
                <CommandItem
                  key={searchToken.address}
                  value={searchToken.address}
                  onSelect={() => {
                    onChangeValue(searchToken);
                    onToggle();
                  }}
                >
                  {searchToken.name ??
                    `Unknown token (${shortenAddress(searchToken.address)})`}
                </CommandItem>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
