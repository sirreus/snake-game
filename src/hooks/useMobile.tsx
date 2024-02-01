import { useEffect, useState, useCallback } from "react";

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);

  const getDevice = useCallback(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  useEffect(() => {
    getDevice();
    window.addEventListener("resize", getDevice);

    return () => {
      window.removeEventListener("resize", getDevice);
    };
  }, [getDevice]);

  return isMobile;
}
