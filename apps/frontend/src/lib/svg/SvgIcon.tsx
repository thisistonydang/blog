import type { ReactNode } from "react";

export default function SvgIcon({
  width = 25,
  height = 25,
  viewBoxWidth = 512,
  viewBoxHeight = 512,
  children,
}: {
  width?: number;
  height?: number;
  viewBoxWidth?: number;
  viewBoxHeight?: number;
  children: ReactNode;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      fill="currentColor"
    >
      {children}
    </svg>
  );
}
