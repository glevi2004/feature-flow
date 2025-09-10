import { PublicAuthProvider } from "@/contexts/PublicAuthContext";

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PublicAuthProvider>{children}</PublicAuthProvider>;
}
