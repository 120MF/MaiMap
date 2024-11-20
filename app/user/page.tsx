import { auth } from "@/auth";
import LoginRedirect from "@/components/LoginRedirect";

export default async function Home() {
  const session = await auth();

  if (!session) return <LoginRedirect />;

  return (
    <div>
      <p>User Page</p>
    </div>
  );
}
