// icon:return-down-back | Ionicons https://ionicons.com/ | Ionic Framework
import * as React from "react";

function IconReturnDownBack(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M112 352l-64-64 64-64"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M64 288h294c58.76 0 106-49.33 106-108v-20"
      />
    </svg>
  );
}

export default IconReturnDownBack;
