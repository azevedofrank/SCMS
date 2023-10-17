import { SignIn } from "@clerk/nextjs";
import { Layout } from "@scdr-app/commons";
 
export default function Page() {
  return <Layout showHeader={false}><SignIn /></Layout>;
}