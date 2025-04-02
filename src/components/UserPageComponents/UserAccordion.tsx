"use client";

import { Accordion, AccordionItem } from "@nextui-org/accordion";

import UpdateProfileForm from "@/components/UserPageComponents/UpdateProfileForm";
import UserReviews from "@/components/UserPageComponents/UserReviews";

function UserAccordion({ session }) {
  return (
    <Accordion defaultExpandedKeys={["1"]} variant="shadow">
      <AccordionItem key="1" title="我的评论" subtitle="查看和编辑自己的评论">
        <UserReviews session={session} />
      </AccordionItem>
      <AccordionItem key="2" title="更新信息" subtitle="更新用户名和密码">
        <UpdateProfileForm session={session} />
      </AccordionItem>
      <AccordionItem key="3" title="设置称号" subtitle="查看和设置称号">
        <p>开发中……</p>
      </AccordionItem>
    </Accordion>
  );
}

export default UserAccordion;
