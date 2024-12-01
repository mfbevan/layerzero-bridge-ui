import { TriangleAlert } from "lucide-react";

export const PocBanner = () => {
  return (
    <div className="flex w-full max-w-xs items-center gap-4 border p-4">
      <div>
        <TriangleAlert className="size-6" />
      </div>
      <div className="flex flex-col">
        <div className="font-mono text-xs font-medium text-muted-foreground">
          This is a proof of concept and should not be used in production.
        </div>
      </div>
    </div>
  );
};
