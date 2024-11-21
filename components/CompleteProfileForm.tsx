"use client";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import { useTheme } from "next-themes";

function CompleteProfileForm({ session }) {
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

  useEffect(() => {
    async function updateUsername() {
      const value = userName;
      const res = await fetch("/api/auth/update/username", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value }),
      });

      if (res.status === 200) {
        toast.success("修改用户名信息成功，即将刷新……", {
          position: "top-right",
          autoClose: 1000,
          type: "success",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: theme,
          transition: Bounce,
        });
      } else {
        toast.error(`修改用户名信息失败`, {
          position: "top-right",
          autoClose: 1000,
          type: "error",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: theme,
          transition: Bounce,
        });
      }
      setInterval(() => {
        window.location.reload();
      }, 1500);
    }
    if (handleUsernameSubmit) {
      if (userName === session?.user?.name) {
        setUserNameError("用户名与修改前相同！");
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
      const res = await fetch("/api/auth/update/password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value, token }),
      });
      if (res.status === 200) {
        toast.success("修改密码成功，即将刷新……", {
          position: "top-right",
          autoClose: 1000,
          type: "success",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: theme,
          transition: Bounce,
        });
      } else {
        toast.error(`修改密码失败！`, {
          position: "top-right",
          autoClose: 1000,
          type: "error",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: theme,
          transition: Bounce,
        });
      }
      setInterval(() => {
        window.location.reload();
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
      <Input
        isInvalid={!!passwordError}
        label="新的密码"
        type="password"
        value={password}
        onValueChange={setPassword}
      />
      <Input
        description="设置密码后，可以使用用户名/邮箱+密码登录"
        errorMessage={passwordError}
        isInvalid={!!passwordError}
        label="确认密码"
        type="password"
        value={confirmPassword}
        onValueChange={setConfirmPassword}
      />
      <div className="flex flex-row justify-around">
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

export default CompleteProfileForm;
