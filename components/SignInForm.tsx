"use client";
import { Tab, Tabs } from "@nextui-org/tabs";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { useState } from "react";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

import IconGithub from "@/components/icons/IconGithub";
import IconOsu from "@/components/icons/IconOsu";
import Icon388Mail from "@/components/icons/Icon388Mail";

function SignInForm() {
  const [selectedKey, setSelectedKey] = useState<string>("one-click");

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
          <div className="flex flex-col gap-3">
            <Divider className="-mt-2" />
            <Button
              fullWidth
              className="bg-gray-700 text-gray-50"
              endContent={<IconGithub />}
              size="lg"
            >
              使用Github登录
            </Button>
            <Button
              fullWidth
              className="bg-pink-400 text-gray-50"
              endContent={<IconOsu />}
              size="lg"
            >
              使用Osu!登录
            </Button>
            <Divider />
            <Input label="电子邮箱" type="email" />
            <Button
              fullWidth
              color="primary"
              endContent={<Icon388Mail />}
              size="lg"
            >
              使用邮箱注册/登录
            </Button>
          </div>
        ) : (
          <div>账密登录</div>
        )}
      </CardBody>
    </Card>
  );
}

export default SignInForm;
