import "./../styles/globals.css";
import { ReactNode } from "react";
import ApolloWrapper from "@/lib/apolloWrapper";

export const metadata = { title: "Muze Feed" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
