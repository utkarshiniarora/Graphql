"use client";

import { ApolloProvider } from "@apollo/client/react";
import { ReactNode } from "react";
import { client } from "./apolloClient";

export default function ApolloWrapper({ children }: { children: ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
