import * as React from "react";

function IconAddFill(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="currentColor"
      height="1em"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" />
    </svg>
  );
}

export default IconAddFill;
