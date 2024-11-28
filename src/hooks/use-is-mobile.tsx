import { type ReactNode, useEffect, useState } from "react";

export const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};

export const useMobileOnly = (node: ReactNode) => {
  const isMobile = useIsMobile();
  return isMobile ? node : null;
};

export const useDesktopOnly = (node: ReactNode) => {
  const isMobile = useIsMobile();
  return isMobile ? null : node;
};

export const useMobileDesktop = <T extends ReactNode | object>(
  mobileNode: T,
  desktopNode: T,
): T => {
  const isMobile = useIsMobile();
  return isMobile ? mobileNode : desktopNode;
};
