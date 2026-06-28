"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { useRef } from "react";
import type { ReactNode } from "react";
import { makeQueryClient } from ".";

type QueryProviderProps = { children: ReactNode };

export function QueryProvider({ children }: QueryProviderProps) {
  const clientRef = useRef<ReturnType<typeof makeQueryClient> | null>(null);
  if (!clientRef.current) clientRef.current = makeQueryClient();
  return (
    <QueryClientProvider client={clientRef.current}>
      {children}
    </QueryClientProvider>
  );
}
