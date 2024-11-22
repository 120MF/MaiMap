import { User as UserCard } from "@nextui-org/user";
import { Chip } from "@nextui-org/chip";

import { auth } from "@/auth";
import LoginRedirect from "@/components/LoginRedirect";
import SignOutButton from "@/components/SignOutButton";
import UserAccordion from "@/components/UserAccordion";

export default async function User() {
  const session = await auth();

  if (!session) return <LoginRedirect />;

  return (
    <div className="px-4 pt-10">
      <div className="flex flex-row items-center justify-between pb-4">
        <UserCard
          avatarProps={{ src: session.user.image }}
          name={!!session.user.name ? session.user.name : session.user.email}
          description={<Chip size="sm">新人出道</Chip>}
        />
        <SignOutButton buttonProps={{ color: "primary", size: "sm" }} />
      </div>
      {!session.user.name ? (
        <p className="text-sm text-red-400 pb-4 animate-pulse">
          你还没有设置用户名！请前往“更新信息”设置一个！
        </p>
      ) : null}
      <UserAccordion session={session} />
    </div>
  );
}
