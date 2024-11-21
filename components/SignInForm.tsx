"use client";
import { Tab, Tabs } from "@nextui-org/tabs";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { useState } from "react";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { ToastProps } from "next/dist/client/components/react-dev-overlay/internal/components/Toast/Toast";
import { useTheme } from "next-themes";
import { useSearchParams } from "next/navigation";

import IconGithub from "@/components/icons/IconGithub";
import IconOsu from "@/components/icons/IconOsu";
import Icon388Mail from "@/components/icons/Icon388Mail";
import IconKey from "@/components/icons/IconKey";
import { toastStyle } from "@/lib/toastStyle";

interface OneClickFormInput {
  email: string;
}

interface PasswordFormInput {
  emailOrName: string;
  password: string;
}

function SignInForm(props: {
  searchParams: { callbackUrl: string | undefined };
}) {
  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  const [selectedKey, setSelectedKey] = useState<string>("one-click");
  const [loadingButton, setLoadingButton] = useState<string>("null");
  const {
    register: oneClickRegister,
    handleSubmit: oneClickHandleSubmit,
    formState: { errors: oneClickErrors },
  } = useForm<OneClickFormInput>();
  const {
    register: passwordRegister,
    handleSubmit: passwordHandleSubmit,
    formState: { errors: passwordErrors },
  } = useForm<PasswordFormInput>();
  const onOneClickSubmit: SubmitHandler<OneClickFormInput> = async (data) => {
    setLoadingButton("email");
    try {
      await signIn("nodemailer", {
        email: data.email,
        redirectTo: props.searchParams?.callbackUrl ?? "",
      });
    } catch (error) {
      throw error;
    }
  };
  const onPasswordClickSubmit: SubmitHandler<PasswordFormInput> = async (
    data,
    e,
  ) => {
    e.preventDefault();
    setLoadingButton("password");
    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (res?.error) {
      toast(`登陆失败,账号或密码有误`, {
        ...(toastStyle as ToastProps),
        theme: theme,
        type: "error",
      });
      setLoadingButton("");
    } else {
      await signIn("credentials", {
        ...data,
        redirectTo: callbackUrl,
      });
    }
  };

  return (
    <Card className="w-[80%]">
      <CardHeader>
        <Tabs
          fullWidth
          aria-label="options"
          selectedKey={selectedKey}
          // @ts-ignore
          onSelectionChange={setSelectedKey}
        >
          <Tab key="one-click" title="一键登录" />
          <Tab key="password" title="账密登录" />
        </Tabs>
      </CardHeader>
      <CardBody>
        {selectedKey === "one-click" ? (
          <>
            <div className="flex flex-col gap-3">
              <Divider className="-mt-2" />
              <Button
                fullWidth
                className="bg-gray-700 text-gray-50"
                endContent={<IconGithub />}
                isLoading={loadingButton === "github"}
                size="lg"
                onPress={() => {
                  try {
                    setLoadingButton("github");
                    signIn("github", {
                      redirectTo: props.searchParams?.callbackUrl ?? "",
                    });
                  } catch (error) {
                    throw error;
                  }
                }}
              >
                使用Github登录
              </Button>
              <Button
                fullWidth
                className="bg-pink-400 text-gray-50"
                endContent={<IconOsu />}
                isLoading={loadingButton === "osu"}
                size="lg"
                onPress={() => {
                  try {
                    setLoadingButton("osu");
                    signIn("osu", {
                      redirectTo: props.searchParams?.callbackUrl ?? "",
                    });
                  } catch (error) {
                    throw error;
                  }
                }}
              >
                使用Osu!登录
              </Button>
              <Divider />
              <form
                className="flex flex-col gap-2"
                onSubmit={oneClickHandleSubmit(onOneClickSubmit)}
              >
                <Input
                  {...oneClickRegister("email", {
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i,
                  })}
                  label="电子邮箱"
                  type="email"
                />
                {oneClickErrors?.email?.type === "required" && (
                  <p className="text-red-400 text-xs pl-2">请输入电子邮箱</p>
                )}
                {oneClickErrors?.email?.type === "pattern" && (
                  <p className="text-red-400 text-xs pl-2">
                    请输入正确的电子邮箱
                  </p>
                )}
                <Button
                  fullWidth
                  color="primary"
                  endContent={<Icon388Mail />}
                  isLoading={loadingButton === "email"}
                  size="lg"
                  type="submit"
                >
                  使用邮箱注册/登录
                </Button>
              </form>
            </div>
            <CardFooter className="pb-1">
              <p className="text-sm opacity-40 text-center w-full">
                未注册的账户将被自动注册
              </p>
            </CardFooter>
          </>
        ) : (
          <form
            className="flex flex-col gap-2"
            onSubmit={passwordHandleSubmit(onPasswordClickSubmit)}
          >
            <Input
              {...passwordRegister("emailOrName", {
                required: true,
              })}
              label="电子邮箱或用户名"
            />
            {passwordErrors?.emailOrName?.type === "required" && (
              <p className="text-red-400 text-xs pl-2">
                请输入电子邮箱或用户名
              </p>
            )}
            <Input
              {...passwordRegister("password", {
                required: true,
              })}
              label="密码"
              type="password"
            />
            {passwordErrors?.password?.type === "required" && (
              <p className="text-red-400 text-xs pl-2">请输入密码</p>
            )}
            <Button
              fullWidth
              color="primary"
              endContent={<IconKey />}
              isLoading={loadingButton === "password"}
              size="lg"
              type="submit"
            >
              使用账号/密码登录
            </Button>
          </form>
        )}
      </CardBody>
    </Card>
  );
}

export default SignInForm;
