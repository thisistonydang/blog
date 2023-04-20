import Dialog from "./Dialog";

import type { MouseEventHandler, ReactNode } from "react";

export default function ControlsDialog(props: {
  isModal?: boolean;
  isProse?: boolean;
  hasPadding?: boolean;
  buttonText?: string;
  onButtonClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}) {
  return (
    <div
      className="
        fixed bottom-24 mx-8 max-h-[calc(100vh-96px-96px-96px)] max-w-2xl
      "
    >
      <Dialog {...props}>{props.children}</Dialog>
    </div>
  );
}
