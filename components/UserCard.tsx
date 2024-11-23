"use client";

import { User } from "@nextui-org/user";
import { Chip } from "@nextui-org/chip";
import { useEffect, useState } from "react";
import { Skeleton } from "@nextui-org/skeleton";

function UserCard({ user, userId }) {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cardUser, setCardUser] = useState(user);

  if (!userId && !user) {
    return;
  }

  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true);
      const res = await fetch(`/api/users/get/byId?id=${userId}`);

      if (res.status === 200) {
        const data = await res.json();

        setCardUser(data);
      } else {
        setError(true);
      }
      setIsLoading(false);
    }
    if (!user) {
      fetchUser();
    } else setCardUser(user);
  }, []);
  if (error) return <p>Unknown Error happened.</p>;
  const name: string | null = cardUser?.name ? cardUser.name : null;
  const email: string | null = cardUser?.email ? cardUser.email : null;
  const avatar: string | null = cardUser?.image ? cardUser.image : null;
  const title: string = cardUser?.title ? cardUser.title : "新人出道";
  const id: string = cardUser?.id?.slice(-4);

  return !user && !userId ? (
    <User name="未注册用户" />
  ) : (
    <Skeleton isLoaded={!isLoading}>
      <User
        avatarProps={{
          src: avatar,
        }}
        description={<Chip size="sm">{title}</Chip>}
        name={
          <span className="flex flex-row gap-2 text-medium">
            <p>{name || email}</p>
            <p className="opacity-30"> #{id}</p>
          </span>
        }
      />
    </Skeleton>
  );
}

export default UserCard;
