"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import store from "../lib/redux/store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function NextAuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>{children}</SessionProvider>;
      </QueryClientProvider>
    </Provider>
  );
}

export default NextAuthProvider;
