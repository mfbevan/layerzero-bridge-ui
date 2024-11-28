import { Globe, TestTube } from "lucide-react";
import { type FC } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useConfig } from "~/config/environment";

export const SelectEnvironment: FC = () => {
  const { environment, changeEnvironment } = useConfig();

  return (
    <Select value={environment} onValueChange={changeEnvironment}>
      <SelectTrigger className="w-[130px]">
        <SelectValue placeholder="Select environment" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="mainnet">
            <Globe className="mr-2 inline size-4 pb-[2px]" />
            Mainnet
          </SelectItem>
          <SelectItem value="testnet">
            <TestTube className="mr-2 inline size-4 pb-[2px]" />
            Testnet
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
