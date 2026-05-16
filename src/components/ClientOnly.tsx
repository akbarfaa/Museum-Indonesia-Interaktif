import { useState, useEffect, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Renders children only on the client side (after hydration).
 * Prevents SSR crashes for libraries that rely on window/document (e.g. Leaflet).
 */
export function ClientOnly({ children, fallback = null }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? <>{children}</> : <>{fallback}</>;
}
