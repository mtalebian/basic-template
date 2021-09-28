import * as React from "react";

function SvgArrowDropDown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M7 10l5 5 5-5H7z" />
    </svg>
  );
}

export default SvgArrowDropDown;
