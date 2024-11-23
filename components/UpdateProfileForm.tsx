"use client";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTheme } from "next-themes";
import { signOut } from "next-auth/react";
import { ToastProps } from "next/dist/client/components/react-dev-overlay/internal/components/Toast/Toast";

import { toastStyle } from "@/lib/toastStyle";

function UpdateProfileForm({ session }) {
  const { theme } = useTheme();
  const [userName, setUserName] = useState<string>(
    !!session?.user?.name ? session.user.name : "",
  );
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [userNameError, setUserNameError] = useState<string>("");
  const [handleUsernameSubmit, setHandleUsernameSubmit] =
    useState<boolean>(false);
  const [handlePasswordSubmit, setHandlePasswordSubmit] =
    useState<boolean>(false);

  /**
   * 更新用户信息逻辑
   * 按钮按下时,handle Username/Password Submit的值改变,触发useEffect.
   * 先对Input中的值进行相应的检查,若有误则更新错误信息并显示;
   * 若无误则使用update/xxx api进行信息更新流程.
   * 注意:信息在数据库上更新,而 auth.js 规定 credentials 登陆方法必须使用jwt储存用户信息
   * 也就是说,更新完数据后即使刷新页面,jwt也不会有变化
   * 所以必须让用户重新登录一次
   * 傻逼auth.js
   */

  useEffect(() => {
    async function updateUsername() {
      const value = userName;
      const res = await fetch("/users/update/username", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value }),
      });

      if (res.status === 200) {
        toast.success("修改用户名信息成功，请使用新信息重新登录!", {
          ...(toastStyle as ToastProps),
          type: "success",
          theme: theme,
        });
      } else {
        toast.error(`修改用户名信息失败`, {
          ...(toastStyle as ToastProps),
          type: "error",
          theme: theme,
        });
      }
      setInterval(() => {
        signOut({ redirectTo: "/user" });
      }, 1500);
    }
    if (handleUsernameSubmit) {
      if (userName === session?.user?.name) {
        setUserNameError("用户名与修改前相同");
      } else if (userName.length <= 4 || userName.length >= 15) {
        setUserNameError("用户名不得小于4或大于15个字符");
      } else {
        setUserNameError("");
        updateUsername();
      }
      setHandleUsernameSubmit(false);
    }
  }, [handleUsernameSubmit]);
  useEffect(() => {
    async function updatePassword() {
      const token = session.sessionToken;
      const value = password;
      const res = await fetch("/users/update/password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value, token }),
      });

      if (res.status === 200) {
        toast.success("修改密码成功，请使用新密码重新登录!", {
          ...(toastStyle as ToastProps),
          type: "success",
          theme: theme,
        });
      } else {
        toast.error(`修改密码失败！`, {
          ...(toastStyle as ToastProps),
          type: "error",
          theme: theme,
        });
      }
      setInterval(() => {
        signOut({ redirectTo: "/user" });
      }, 1500);
    }
    if (handlePasswordSubmit) {
      if (password !== confirmPassword) {
        setPasswordError("两次密码不一致！");
      } else {
        updatePassword();
        setPasswordError("");
      }
      setHandlePasswordSubmit(false);
    }
  }, [handlePasswordSubmit]);

  return (
    <div className="flex flex-col gap-2">
      <Input
        description={`${!!session?.user?.name ? "可以随时修改自己的用户名" : "你还没有设置用户名，快来设置一个吧！"}`}
        errorMessage={userNameError}
        isInvalid={!!userNameError}
        label="用户名"
        value={userName}
        onValueChange={setUserName}
      />
      {/* autoComplete="off"反而没用,怪 */}
      <Input
        autoComplete="new-password"
        isInvalid={!!passwordError}
        label="新的密码"
        type="password"
        value={password}
        onValueChange={setPassword}
      />
      <Input
        autoComplete="new-password"
        description="设置密码后，可以使用用户名/邮箱+密码登录"
        errorMessage={passwordError}
        isInvalid={!!passwordError}
        label="确认密码"
        type="password"
        value={confirmPassword}
        onValueChange={setConfirmPassword}
      />
      <div className="flex flex-row justify-around gap-4">
        <Button
          fullWidth
          color="secondary"
          isLoading={handleUsernameSubmit}
          onPress={() => {
            setHandleUsernameSubmit(true);
          }}
        >
          设置用户名
        </Button>
        <Button
          fullWidth
          color="danger"
          isLoading={handlePasswordSubmit}
          onPress={() => {
            setHandlePasswordSubmit(true);
          }}
        >
          设置密码
        </Button>
      </div>
    </div>
  );
}

export default UpdateProfileForm;
