"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { type FC } from "react";
import { ThirdwebProvider } from "thirdweb/react";

import { getQueryClient } from "~/config/query-client";

const Providers: FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider>{children}</ThirdwebProvider>
    </QueryClientProvider>
  );
};

export default Providers;
