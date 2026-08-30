import { useEffect, useLayoutEffect } from "react";

/* useLayoutEffect warns during SSR. Every animation hook here needs
   layout-effect timing on the client (measure before paint), so swap
   in useEffect on the server where it never actually runs. */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
